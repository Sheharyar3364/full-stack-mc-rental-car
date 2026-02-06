<?php

namespace App\Filament\Resources\Customers\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CustomerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Personal Information')
                    ->columns(2)
                    ->schema([
                        TextInput::make('first_name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('last_name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('email')
                            ->label('Email Address')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        TextInput::make('phone')
                            ->tel()
                            ->maxLength(20),
                        DatePicker::make('date_of_birth')
                            ->maxDate(now()->subYears(18))
                            ->helperText('Must be 18 or older'),
                    ]),

                Section::make("Driver's License")
                    ->columns(2)
                    ->schema([
                        TextInput::make('drivers_license_number')
                            ->label('License Number')
                            ->maxLength(50),
                        DatePicker::make('drivers_license_expiry')
                            ->label('Expiry Date')
                            ->minDate(now()),
                    ]),

                Section::make('Address')
                    ->columns(2)
                    ->schema([
                        Textarea::make('address')
                            ->label('Street Address')
                            ->rows(2)
                            ->columnSpanFull(),
                        TextInput::make('city')
                            ->maxLength(100),
                        TextInput::make('state')
                            ->maxLength(100),
                        TextInput::make('postal_code')
                            ->maxLength(20),
                        TextInput::make('country')
                            ->required()
                            ->default('USA')
                            ->maxLength(100),
                    ]),

                Section::make('Status & Notes')
                    ->schema([
                        Toggle::make('is_blacklisted')
                            ->label('Blacklisted')
                            ->helperText('Blacklisted customers cannot make new bookings'),
                        \Filament\Forms\Components\Select::make('verification_status')
                            ->label('Verification Status')
                            ->options([
                                'unverified' => 'Unverified',
                                'pending' => 'Pending Review',
                                'verified' => 'Verified',
                                'rejected' => 'Rejected',
                            ])
                            ->required()
                            ->default('unverified'),
                        Textarea::make('notes')
                            ->label('Internal Notes')
                            ->rows(3)
                            ->placeholder('Admin notes about this customer...'),
                        Textarea::make('verification_notes')
                            ->label('Verification Reason/Notes')
                            ->rows(2)
                            ->placeholder('Notes shared with user about verification...'),
                    ]),
            ]);
    }
}
