<?php

namespace App\Filament\Resources\Bookings\Tables;

use App\Enums\BookingStatus;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class BookingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('booking_number')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->weight('bold'),
                TextColumn::make('customer.first_name')
                    ->label('Customer')
                    ->formatStateUsing(fn ($record) => $record->customer?->full_name)
                    ->searchable(['first_name', 'last_name'])
                    ->sortable(),
                TextColumn::make('car.brand')
                    ->label('Vehicle')
                    ->formatStateUsing(fn ($record) => $record->car ? "{$record->car->year} {$record->car->brand} {$record->car->model}" : '-')
                    ->searchable(),
                TextColumn::make('pickup_date')
                    ->label('Pickup')
                    ->dateTime('M d, Y H:i')
                    ->sortable(),
                TextColumn::make('dropoff_date')
                    ->label('Dropoff')
                    ->dateTime('M d, Y H:i')
                    ->sortable(),
                TextColumn::make('total_days')
                    ->label('Days')
                    ->numeric()
                    ->alignCenter(),
                TextColumn::make('total_amount')
                    ->money('USD')
                    ->sortable()
                    ->label('Total'),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (BookingStatus $state): string => $state->getColor()),
                TextColumn::make('pickupLocation.name')
                    ->label('Pickup Loc')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('dropoffLocation.name')
                    ->label('Dropoff Loc')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options(BookingStatus::class),
                SelectFilter::make('pickup_location_id')
                    ->label('Pickup Location')
                    ->relationship('pickupLocation', 'name'),
                Filter::make('pickup_today')
                    ->label('Pickup Today')
                    ->query(fn (Builder $query) => $query->whereDate('pickup_date', today())),
                Filter::make('active_rentals')
                    ->label('Active Rentals')
                    ->query(fn (Builder $query) => $query->where('status', BookingStatus::Active)),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('confirm')
                    ->label('Confirm')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn ($record) => $record->status === BookingStatus::Pending)
                    ->action(function ($record) {
                        $record->update(['status' => BookingStatus::Confirmed]);
                        Notification::make()->title('Booking confirmed')->success()->send();
                    }),
                Action::make('start_rental')
                    ->label('Start Rental')
                    ->icon('heroicon-o-key')
                    ->color('info')
                    ->requiresConfirmation()
                    ->visible(fn ($record) => $record->status === BookingStatus::Confirmed)
                    ->action(function ($record) {
                        $record->update([
                            'status' => BookingStatus::Active,
                            'actual_pickup_date' => now(),
                        ]);
                        // Mark car as rented
                        $record->car->update(['status' => \App\Enums\CarStatus::Rented]);
                        Notification::make()->title('Rental started')->success()->send();
                    }),
                Action::make('complete_rental')
                    ->label('Complete')
                    ->icon('heroicon-o-flag')
                    ->color('success')
                    ->requiresConfirmation()
                    ->form([
                        \Filament\Forms\Components\TextInput::make('mileage')
                            ->label('Return Mileage')
                            ->required()
                            ->numeric(),
                    ])
                    ->visible(fn ($record) => $record->status === BookingStatus::Active)
                    ->action(function ($record, array $data) {
                        $record->update([
                            'status' => BookingStatus::Completed,
                            'actual_dropoff_date' => now(),
                        ]);
                        // Update car mileage and status
                        $record->car->update([
                            'status' => \App\Enums\CarStatus::Available,
                            'mileage' => $data['mileage'],
                        ]);
                        Notification::make()->title('Rental completed')->success()->send();
                    }),
                Action::make('cancel')
                    ->label('Cancel')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->visible(fn ($record) => in_array($record->status, [BookingStatus::Pending, BookingStatus::Confirmed]))
                    ->action(function ($record) {
                        $record->update(['status' => BookingStatus::Cancelled]);
                        Notification::make()->title('Booking cancelled')->danger()->send();
                    }),
                Action::make('send_payment_reminder')
                    ->label('Send Payment Reminder')
                    ->icon('heroicon-o-envelope')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->modalHeading('Send Payment Reminder')
                    ->modalDescription(fn ($record) => "Send payment reminder email to {$record->customer->email}? Balance due: $" . number_format($record->balance_due, 2))
                    ->visible(fn ($record) => $record->balance_due > 0)
                    ->action(function ($record) {
                        // Send the email
                        \Illuminate\Support\Facades\Mail::to($record->customer->email)
                            ->send(new \App\Mail\BalancePaymentReminder($record));
                        
                        // Update reminder sent timestamp
                        $record->update(['payment_reminder_sent_at' => now()]);
                        
                        Notification::make()
                            ->title('Payment reminder sent')
                            ->body("Email sent to {$record->customer->email}")
                            ->success()
                            ->send();
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
