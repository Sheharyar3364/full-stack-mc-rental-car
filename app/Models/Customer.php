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
        'user_id',
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
        'verification_status',
        'verification_notes',
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
     * Check if the customer is verified.
     */
    public function isVerified(): bool
    {
        return $this->verification_status === 'verified';
    }

    /**
     * Customer's bookings.
     */
    /**
     * Customer's bookings.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the user that owns the customer record.
     */
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Customer's documents.
     */
    public function documents(): HasMany
    {
        return $this->hasMany(CustomerDocument::class);
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
