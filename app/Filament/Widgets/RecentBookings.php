<?php

namespace App\Filament\Widgets;

use App\Enums\BookingStatus;
use App\Models\Booking;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;

class RecentBookings extends TableWidget
{
    protected static ?int $sort = 2;

    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Booking::query()
                    ->with(['customer', 'car'])
                    ->latest()
                    ->limit(5)
            )
            ->columns([
                TextColumn::make('booking_number')
                    ->label('Booking #')
                    ->weight('bold'),
                TextColumn::make('customer.first_name')
                    ->label('Customer')
                    ->formatStateUsing(fn ($record) => $record->customer?->full_name ?? '-'),
                TextColumn::make('car.brand')
                    ->label('Vehicle')
                    ->formatStateUsing(fn ($record) => $record->car ? "{$record->car->brand} {$record->car->model}" : '-'),
                TextColumn::make('pickup_date')
                    ->label('Pickup')
                    ->dateTime('M d, Y'),
                TextColumn::make('total_amount')
                    ->money('USD'),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (BookingStatus $state): string => $state->getColor()),
            ])
            ->paginated(false);
    }
}
