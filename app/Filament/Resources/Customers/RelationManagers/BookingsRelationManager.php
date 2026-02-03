<?php

namespace App\Filament\Resources\Customers\RelationManagers;

use App\Enums\BookingStatus;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class BookingsRelationManager extends RelationManager
{
    protected static string $relationship = 'bookings';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('booking_number')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('booking_number')
            ->columns([
                Tables\Columns\TextColumn::make('booking_number'),
                Tables\Columns\TextColumn::make('car.brand')
                    ->label('Vehicle')
                    ->formatStateUsing(fn ($record) => $record->car ? "{$record->car->year} {$record->car->brand} {$record->car->model}" : '-'),
                Tables\Columns\TextColumn::make('pickup_date')
                    ->date(),
                Tables\Columns\TextColumn::make('dropoff_date')
                    ->date(),
                Tables\Columns\TextColumn::make('total_amount')
                    ->money('EUR'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (BookingStatus $state): string => $state->getColor()),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                // \Filament\Actions\CreateAction::make(),
            ])
            ->actions([
                \Filament\Actions\ViewAction::make(),
                // \Filament\Actions\EditAction::make(),
                // \Filament\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                // \Filament\Actions\BulkActionGroup::make([
                //     \Filament\Actions\DeleteBulkAction::make(),
                // ]),
            ]);
    }
}
