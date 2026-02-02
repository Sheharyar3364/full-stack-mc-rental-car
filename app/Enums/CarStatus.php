<?php

namespace App\Enums;

enum CarStatus: string
{
    case Available = 'available';
    case Rented = 'rented';
    case Maintenance = 'maintenance';

    public function getLabel(): string
    {
        return match ($this) {
            self::Available => 'Available',
            self::Rented => 'Rented',
            self::Maintenance => 'Maintenance',
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Available => 'success',
            self::Rented => 'warning',
            self::Maintenance => 'danger',
        };
    }
}
