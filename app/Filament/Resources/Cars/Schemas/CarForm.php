<?php

namespace App\Filament\Resources\Cars\Schemas;

use App\Enums\CarStatus;
use App\Enums\FuelType;
use App\Enums\Transmission;
use App\Models\CarCategory;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CarForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Vehicle Information')
                    ->columns(2)
                    ->schema([
                        Select::make('car_category_id')
                            ->label('Category')
                            ->options(CarCategory::query()->where('is_active', true)->pluck('name', 'id'))
                            ->required()
                            ->searchable()
                            ->preload(),
                        TextInput::make('brand')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('model')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('year')
                            ->required()
                            ->numeric()
                            ->minValue(1990)
                            ->maxValue(date('Y') + 1),
                        TextInput::make('color')
                            ->required()
                            ->maxLength(50),
                        TextInput::make('seats')
                            ->required()
                            ->numeric()
                            ->default(5)
                            ->minValue(2)
                            ->maxValue(15),
                    ]),

                Section::make('Registration & Identification')
                    ->columns(2)
                    ->schema([
                        TextInput::make('license_plate')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(20),
                        TextInput::make('vin')
                            ->label('VIN')
                            ->unique(ignoreRecord: true)
                            ->maxLength(17),
                        TextInput::make('mileage')
                            ->required()
                            ->numeric()
                            ->default(0)
                            ->suffix('miles'),
                    ]),

                Section::make('Specifications')
                    ->columns(2)
                    ->schema([
                        Select::make('fuel_type')
                            ->options(FuelType::class)
                            ->default(FuelType::Petrol)
                            ->required(),
                        Select::make('transmission')
                            ->options(Transmission::class)
                            ->default(Transmission::Automatic)
                            ->required(),
                    ]),

                Section::make('Pricing & Status')
                    ->columns(2)
                    ->schema([
                        TextInput::make('daily_rate')
                            ->numeric()
                            ->prefix('$')
                            ->helperText('Leave blank to use category rate'),
                        Select::make('status')
                            ->options(CarStatus::class)
                            ->default(CarStatus::Available)
                            ->required(),
                        Toggle::make('is_active')
                            ->label('Active')
                            ->default(true)
                            ->helperText('Inactive cars are hidden from availability'),
                    ]),

                Section::make('Images')
                    ->schema([
                        FileUpload::make('images')
                            ->label('Car Images (Multiple)')
                            ->image()
                            ->multiple()
                            ->reorderable()
                            ->maxFiles(10)
                            ->directory('cars')
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('16:9')
                            ->imageResizeTargetWidth('1920')
                            ->imageResizeTargetHeight('1080')
                            ->helperText('Upload up to 10 images. First image will be the main image.')
                            ->columnSpanFull(),
                        FileUpload::make('featured_image')
                            ->label('Featured Image (Homepage)')
                            ->image()
                            ->directory('cars/featured')
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('16:9')
                            ->imageResizeTargetWidth('1920')
                            ->imageResizeTargetHeight('1080')
                            ->helperText('Special image for homepage featured section')
                            ->columnSpanFull(),
                    ]),

                Section::make('Featured Settings')
                    ->schema([
                        Toggle::make('is_featured')
                            ->label('Show on Homepage')
                            ->helperText('Feature this car on the homepage')
                            ->default(false),
                    ]),
            ]);
    }
}
