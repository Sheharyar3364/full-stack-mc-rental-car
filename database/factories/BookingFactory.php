<?php

namespace Database\Factories;

use App\Enums\BookingStatus;
use App\Models\Car;
use App\Models\Customer;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pickupDate = fake()->dateTimeBetween('now', '+1 month');
        $dropoffDate = fake()->dateTimeBetween($pickupDate, '+2 months');
        $totalDays = max(1, (int) $pickupDate->diff($dropoffDate)->days);
        $dailyRate = fake()->randomFloat(2, 35, 150);
        $subtotal = $totalDays * $dailyRate;
        $taxRate = 0.08;
        $taxAmount = $subtotal * $taxRate;
        $totalAmount = $subtotal + $taxAmount;

        return [
            'booking_number' => null, // Auto-generated
            'customer_id' => Customer::factory(),
            'car_id' => Car::factory(),
            'pickup_location_id' => Location::factory(),
            'dropoff_location_id' => Location::factory(),
            'pickup_date' => $pickupDate,
            'dropoff_date' => $dropoffDate,
            'actual_pickup_date' => null,
            'actual_dropoff_date' => null,
            'daily_rate' => $dailyRate,
            'total_days' => $totalDays,
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'deposit_amount' => 200.00,
            'status' => BookingStatus::Pending,
            'notes' => null,
        ];
    }

    /**
     * Indicate that the booking is confirmed.
     */
    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => BookingStatus::Confirmed,
        ]);
    }

    /**
     * Indicate that the booking is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => BookingStatus::Active,
            'actual_pickup_date' => now(),
        ]);
    }

    /**
     * Indicate that the booking is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => BookingStatus::Completed,
            'actual_pickup_date' => now()->subDays(3),
            'actual_dropoff_date' => now(),
        ]);
    }

    /**
     * Indicate that the booking is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => BookingStatus::Cancelled,
        ]);
    }
}
