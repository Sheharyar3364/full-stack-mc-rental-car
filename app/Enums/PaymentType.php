<?php

namespace App\Enums;

enum PaymentType: string
{
    case Deposit = 'deposit';
    case Rental = 'rental';
    case Refund = 'refund';
    case Damage = 'damage';

    public function getLabel(): string
    {
        return match ($this) {
            self::Deposit => 'Deposit',
            self::Rental => 'Rental Payment',
            self::Refund => 'Refund',
            self::Damage => 'Damage Fee',
        };
    }
}
