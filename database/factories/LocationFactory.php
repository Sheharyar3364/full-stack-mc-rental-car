<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $locationTypes = ['Airport', 'Downtown', 'Mall', 'Station', 'Hotel'];
        $cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Miami', 'Seattle', 'Denver'];

        $city = fake()->randomElement($cities);
        $type = fake()->randomElement($locationTypes);

        return [
            'name' => "{$city} {$type}",
            'address' => fake()->streetAddress(),
            'city' => $city,
            'state' => fake()->stateAbbr(),
            'postal_code' => fake()->postcode(),
            'country' => 'USA',
            'phone' => fake()->phoneNumber(),
            'email' => fake()->companyEmail(),
            'opening_hours' => [
                'monday' => '08:00-20:00',
                'tuesday' => '08:00-20:00',
                'wednesday' => '08:00-20:00',
                'thursday' => '08:00-20:00',
                'friday' => '08:00-21:00',
                'saturday' => '09:00-18:00',
                'sunday' => '10:00-16:00',
            ],
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the location is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}
