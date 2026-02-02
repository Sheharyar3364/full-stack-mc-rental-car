<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'date_of_birth' => fake()->dateTimeBetween('-60 years', '-21 years'),
            'drivers_license_number' => strtoupper(fake()->bothify('??######')),
            'drivers_license_expiry' => fake()->dateTimeBetween('+1 year', '+5 years'),
            'address' => fake()->streetAddress(),
            'city' => fake()->city(),
            'state' => fake()->stateAbbr(),
            'postal_code' => fake()->postcode(),
            'country' => 'USA',
            'is_blacklisted' => false,
            'notes' => null,
        ];
    }

    /**
     * Indicate that the customer is blacklisted.
     */
    public function blacklisted(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_blacklisted' => true,
            'notes' => 'Customer blacklisted due to policy violation.',
        ]);
    }

    /**
     * Indicate that the customer has an expired license.
     */
    public function expiredLicense(): static
    {
        return $this->state(fn (array $attributes) => [
            'drivers_license_expiry' => fake()->dateTimeBetween('-2 years', '-1 day'),
        ]);
    }
}
