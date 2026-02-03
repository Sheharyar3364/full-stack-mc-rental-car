<?php

namespace App\Filament\Resources\Bookings\Schemas;

use App\Enums\BookingStatus;
use App\Enums\CarStatus;
use App\Models\Car;
use App\Models\Customer;
use App\Models\Location;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Placeholder;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class BookingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Booking Information')
                    ->columns(2)
                    ->schema([
                        Placeholder::make('booking_number')
                            ->label('Booking Number')
                            ->content(fn ($record) => $record?->booking_number ?? 'Auto-generated'),
                        Select::make('status')
                            ->options(BookingStatus::class)
                            ->default(BookingStatus::Pending)
                            ->required(),
                    ]),

                Section::make('Customer')
                    ->schema([
                        Select::make('customer_id')
                            ->label('Customer')
                            ->options(function () {
                                return Customer::query()
                                    ->where('is_blacklisted', false)
                                    ->get()
                                    ->mapWithKeys(fn ($customer) => [
                                        $customer->id => "{$customer->first_name} {$customer->last_name} ({$customer->email})",
                                    ]);
                            })
                            ->required()
                            ->searchable()
                            ->preload(),
                    ]),

                Section::make('Vehicle')
                    ->schema([
                        Select::make('car_id')
                            ->label('Car')
                            ->options(function () {
                                return Car::query()
                                    ->where('is_active', true)
                                    ->where('status', CarStatus::Available)
                                    ->with('category')
                                    ->get()
                                    ->mapWithKeys(fn ($car) => [
                                        $car->id => "{$car->year} {$car->brand} {$car->model} ({$car->license_plate}) - €{$car->effective_daily_rate}/day",
                                    ]);
                            })
                            ->required()
                            ->searchable()
                            ->preload()
                            ->live()
                            ->afterStateUpdated(function (Get $get, Set $set, $state) {
                                if ($state) {
                                    $car = Car::with('category')->find($state);
                                    if ($car) {
                                        $set('daily_rate', $car->effective_daily_rate);
                                        self::calculateTotals($get, $set);
                                    }
                                }
                            }),
                    ]),

                Section::make('Pickup & Dropoff')
                    ->columns(2)
                    ->schema([
                        Select::make('pickup_location_id')
                            ->label('Pickup Location')
                            ->options(Location::where('is_active', true)->pluck('name', 'id'))
                            ->required()
                            ->searchable(),
                        Select::make('dropoff_location_id')
                            ->label('Dropoff Location')
                            ->options(Location::where('is_active', true)->pluck('name', 'id'))
                            ->required()
                            ->searchable(),
                        DateTimePicker::make('pickup_date')
                            ->required()
                            ->minDate(now())
                            ->live()
                            ->afterStateUpdated(fn (Get $get, Set $set) => self::calculateTotals($get, $set)),
                        DateTimePicker::make('dropoff_date')
                            ->required()
                            ->minDate(fn (Get $get) => $get('pickup_date') ?: now())
                            ->live()
                            ->afterStateUpdated(fn (Get $get, Set $set) => self::calculateTotals($get, $set)),
                        DateTimePicker::make('actual_pickup_date')
                            ->label('Actual Pickup')
                            ->visible(fn ($record) => $record?->status !== BookingStatus::Pending),
                        DateTimePicker::make('actual_dropoff_date')
                            ->label('Actual Dropoff')
                            ->visible(fn ($record) => in_array($record?->status, [BookingStatus::Active, BookingStatus::Completed])),
                    ]),

                Section::make('Pricing')
                    ->columns(3)
                    ->schema([
                        TextInput::make('daily_rate')
                            ->required()
                            ->numeric()
                            ->prefix('€')
                            ->live()
                            ->afterStateUpdated(fn (Get $get, Set $set) => self::calculateTotals($get, $set)),
                        TextInput::make('total_days')
                            ->required()
                            ->numeric()
                            ->readOnly(),
                        TextInput::make('subtotal')
                            ->required()
                            ->numeric()
                            ->prefix('€')
                            ->readOnly(),
                        TextInput::make('tax_amount')
                            ->required()
                            ->numeric()
                            ->prefix('€')
                            ->default(0)
                            ->readOnly(),
                        TextInput::make('total_amount')
                            ->required()
                            ->numeric()
                            ->prefix('€')
                            ->readOnly(),
                        TextInput::make('deposit_amount')
                            ->required()
                            ->numeric()
                            ->prefix('€')
                            ->default(200),
                    ]),

                Section::make('Notes')
                    ->schema([
                        Textarea::make('notes')
                            ->rows(3)
                            ->placeholder('Special requests or internal notes...'),
                    ]),
            ]);
    }

    private static function calculateTotals(Get $get, Set $set): void
    {
        $pickupDate = $get('pickup_date');
        $dropoffDate = $get('dropoff_date');
        $dailyRate = $get('daily_rate') ?? 0;

        if ($pickupDate && $dropoffDate) {
            $start = \Carbon\Carbon::parse($pickupDate);
            $end = \Carbon\Carbon::parse($dropoffDate);
            $totalDays = max(1, $start->diffInDays($end));

            $subtotal = $totalDays * $dailyRate;
            $taxRate = 0.08;
            $taxAmount = $subtotal * $taxRate;
            $totalAmount = $subtotal + $taxAmount;

            $set('total_days', $totalDays);
            $set('subtotal', round($subtotal, 2));
            $set('tax_amount', round($taxAmount, 2));
            $set('total_amount', round($totalAmount, 2));
        }
    }
}
