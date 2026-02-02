<?php

namespace App\Models;

use App\Enums\CarStatus;
use App\Enums\FuelType;
use App\Enums\Transmission;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Car extends Model
{
    /** @use HasFactory<\Database\Factories\CarFactory> */
    use HasFactory;

    protected $fillable = [
        'car_category_id',
        'brand',
        'model',
        'year',
        'license_plate',
        'vin',
        'color',
        'mileage',
        'fuel_type',
        'transmission',
        'seats',
        'daily_rate',
        'status',
        'image',
        'is_active',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'mileage' => 'integer',
            'seats' => 'integer',
            'daily_rate' => 'decimal:2',
            'fuel_type' => FuelType::class,
            'transmission' => Transmission::class,
            'status' => CarStatus::class,
            'is_active' => 'boolean',
        ];
    }

    /**
     * The category this car belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(CarCategory::class, 'car_category_id');
    }

    /**
     * Bookings for this car.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the effective daily rate (car-specific or category default).
     */
    public function getEffectiveDailyRateAttribute(): float
    {
        return $this->daily_rate ?? $this->category->daily_rate;
    }

    /**
     * Get full name (brand + model + year).
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->year} {$this->brand} {$this->model}";
    }

    /**
     * Check if the car is available for a given date range.
     */
    public function isAvailableForDates(\DateTime $start, \DateTime $end): bool
    {
        if ($this->status !== CarStatus::Available) {
            return false;
        }

        return ! $this->bookings()
            ->whereIn('status', ['pending', 'confirmed', 'active'])
            ->where(function ($query) use ($start, $end) {
                $query->whereBetween('pickup_date', [$start, $end])
                    ->orWhereBetween('dropoff_date', [$start, $end])
                    ->orWhere(function ($q) use ($start, $end) {
                        $q->where('pickup_date', '<=', $start)
                            ->where('dropoff_date', '>=', $end);
                    });
            })
            ->exists();
    }
}
