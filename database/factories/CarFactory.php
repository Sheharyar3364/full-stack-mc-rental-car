<?php

namespace Database\Factories;

use App\Enums\CarStatus;
use App\Enums\FuelType;
use App\Enums\Transmission;
use App\Models\CarCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = [
            'Toyota' => ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius'],
            'Honda' => ['Accord', 'Civic', 'CR-V', 'Pilot', 'Fit'],
            'Ford' => ['Fusion', 'Focus', 'Explorer', 'Escape', 'Mustang'],
            'Chevrolet' => ['Malibu', 'Cruze', 'Equinox', 'Tahoe', 'Camaro'],
            'BMW' => ['3 Series', '5 Series', 'X3', 'X5', 'M3'],
            'Mercedes-Benz' => ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
            'Nissan' => ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Maxima'],
            'Hyundai' => ['Sonata', 'Elantra', 'Tucson', 'Santa Fe', 'Kona'],
        ];

        $brand = fake()->randomElement(array_keys($brands));
        $model = fake()->randomElement($brands[$brand]);

        $colors = ['Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Navy', 'Green'];

        return [
            'car_category_id' => CarCategory::factory(),
            'brand' => $brand,
            'model' => $model,
            'year' => fake()->numberBetween(2020, 2026),
            'license_plate' => strtoupper(fake()->bothify('???-####')),
            'vin' => strtoupper(fake()->bothify('?????????????????')),
            'color' => fake()->randomElement($colors),
            'mileage' => fake()->numberBetween(1000, 80000),
            'fuel_type' => fake()->randomElement(FuelType::cases()),
            'transmission' => fake()->randomElement(Transmission::cases()),
            'seats' => fake()->randomElement([2, 4, 5, 7, 8]),
            'daily_rate' => null, // Use category rate
            'status' => CarStatus::Available,
            'image' => null,
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the car is rented.
     */
    public function rented(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => CarStatus::Rented,
        ]);
    }

    /**
     * Indicate that the car is under maintenance.
     */
    public function maintenance(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => CarStatus::Maintenance,
        ]);
    }

    /**
     * Indicate that the car is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}
