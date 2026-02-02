<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    /** @use HasFactory<\Database\Factories\CustomerFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'date_of_birth',
        'drivers_license_number',
        'drivers_license_expiry',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'is_blacklisted',
        'notes',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'drivers_license_expiry' => 'date',
            'is_blacklisted' => 'boolean',
        ];
    }

    /**
     * Customer's bookings.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the customer's full name.
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    /**
     * Check if the driver's license is valid.
     */
    public function hasValidLicense(): bool
    {
        if (! $this->drivers_license_expiry) {
            return false;
        }

        return $this->drivers_license_expiry->isFuture();
    }
}
