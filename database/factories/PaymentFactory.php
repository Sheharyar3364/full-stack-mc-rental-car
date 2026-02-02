<?php

namespace Database\Factories;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Enums\PaymentType;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'amount' => fake()->randomFloat(2, 50, 500),
            'payment_method' => fake()->randomElement(PaymentMethod::cases()),
            'payment_type' => PaymentType::Rental,
            'transaction_id' => strtoupper(fake()->bothify('TXN-########')),
            'status' => PaymentStatus::Pending,
            'paid_at' => null,
            'notes' => null,
        ];
    }

    /**
     * Indicate that the payment is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => PaymentStatus::Completed,
            'paid_at' => now(),
        ]);
    }

    /**
     * Indicate that the payment is a deposit.
     */
    public function deposit(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_type' => PaymentType::Deposit,
            'amount' => 200.00,
        ]);
    }

    /**
     * Indicate that the payment is a refund.
     */
    public function refund(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_type' => PaymentType::Refund,
            'status' => PaymentStatus::Refunded,
        ]);
    }
}
