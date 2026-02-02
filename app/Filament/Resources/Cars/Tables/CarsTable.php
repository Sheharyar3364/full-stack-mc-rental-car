<?php

namespace App\Filament\Resources\Cars\Tables;

use App\Enums\CarStatus;
use App\Enums\FuelType;
use App\Enums\Transmission;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class CarsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->circular()
                    ->size(40),
                TextColumn::make('category.name')
                    ->label('Category')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('brand')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('model')
                    ->searchable(),
                TextColumn::make('year')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('license_plate')
                    ->searchable()
                    ->copyable(),
                TextColumn::make('color')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('mileage')
                    ->numeric()
                    ->sortable()
                    ->suffix(' mi'),
                TextColumn::make('fuel_type')
                    ->badge(),
                TextColumn::make('transmission')
                    ->badge()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('seats')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('daily_rate')
                    ->money('USD')
                    ->sortable()
                    ->label('Rate/Day'),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (CarStatus $state): string => $state->getColor()),
                IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('car_category_id')
                    ->label('Category')
                    ->relationship('category', 'name'),
                SelectFilter::make('status')
                    ->options(CarStatus::class),
                SelectFilter::make('fuel_type')
                    ->options(FuelType::class),
                SelectFilter::make('transmission')
                    ->options(Transmission::class),
                TernaryFilter::make('is_active')
                    ->label('Active Status'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
