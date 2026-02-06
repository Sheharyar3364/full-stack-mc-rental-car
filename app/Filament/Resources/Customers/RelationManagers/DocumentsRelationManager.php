<?php

namespace App\Filament\Resources\Customers\RelationManagers;

use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Schemas\Schema; // Ensure this import matches Filament version (v3 uses Form, v4 uses Schema? Actually Filament v3 uses Form)
// Wait, the error said: "compatibility between ... form(Filament\Forms\Form $form): Filament\Forms\Form and Filament\Resources\RelationManagers\RelationManager::form(Filament\Schemas\Schema $schema): Filament\Schemas\Schema"
// This strongly implies I MUST use Schema.
// Let's assume Filament v4 logic based on the error message.

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage;

class DocumentsRelationManager extends RelationManager
{
    protected static string $relationship = 'documents';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Forms\Components\Select::make('type')
                    ->options([
                        'license_front' => 'Driver License (Front)',
                        'license_back' => 'Driver License (Back)',
                        'passport' => 'Passport',
                        'id_card_front' => 'ID Card (Front)',
                        'id_card_back' => 'ID Card (Back)',
                        'proof_of_address' => 'Proof of Address',
                    ])
                    ->required(),

                Forms\Components\FileUpload::make('path')
                    ->label('Document File')
                    ->disk('secure_documents')
                    ->visibility('private')
                    ->directory('customer-uploads')
                    ->preserveFilenames()
                    ->required()
                    ->columnSpanFull(),

                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'verified' => 'Verified',
                        'rejected' => 'Rejected',
                    ])
                    ->required()
                    ->default('pending'),

                Forms\Components\Textarea::make('notes')
                    ->label('Internal Notes')
                    ->columnSpanFull(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('type')
            ->columns([
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->formatStateUsing(fn(string $state): string => match ($state) {
                        'license_front' => 'License (Front)',
                        'license_back' => 'License (Back)',
                        'passport' => 'Passport',
                        'id_card_front' => 'ID Card (Front)',
                        'id_card_back' => 'ID Card (Back)',
                        'proof_of_address' => 'Proof of Address',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'pending' => 'warning',
                        'verified' => 'success',
                        'rejected' => 'danger',
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('verified_at')
                    ->dateTime()
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
                Action::make('download')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->label('Download')
                    ->action(function ($record) {
                        return Storage::disk('secure_documents')->download($record->path);
                    }),
                Action::make('verify')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->action(function ($record) {
                        $record->update([
                            'status' => 'verified',
                            'verified_at' => now(),
                        ]);
                    })
                    ->hidden(fn($record) => $record->status === 'verified'),
                Action::make('reject')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->form([
                        Forms\Components\Textarea::make('rejection_reason')
                            ->required()
                            ->label('Reason for Rejection'),
                    ])
                    ->action(function ($record, array $data) {
                        $record->update([
                            'status' => 'rejected',
                            'rejection_reason' => $data['rejection_reason'],
                        ]);
                    })
                    ->hidden(fn($record) => $record->status === 'rejected'),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
