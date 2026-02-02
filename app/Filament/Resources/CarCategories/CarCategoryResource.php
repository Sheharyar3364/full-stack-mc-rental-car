<?php

namespace App\Filament\Resources\CarCategories;

use App\Filament\Resources\CarCategories\Pages\CreateCarCategory;
use App\Filament\Resources\CarCategories\Pages\EditCarCategory;
use App\Filament\Resources\CarCategories\Pages\ListCarCategories;
use App\Filament\Resources\CarCategories\Schemas\CarCategoryForm;
use App\Filament\Resources\CarCategories\Tables\CarCategoriesTable;
use App\Models\CarCategory;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CarCategoryResource extends Resource
{
    protected static ?string $model = CarCategory::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-tag';

    public static function form(Schema $schema): Schema
    {
        return CarCategoryForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CarCategoriesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCarCategories::route('/'),
            'create' => CreateCarCategory::route('/create'),
            'edit' => EditCarCategory::route('/{record}/edit'),
        ];
    }
}
