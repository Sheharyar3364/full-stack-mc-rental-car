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
            // Luxury Brands
            'Mercedes-Benz' => ['S-Class', 'E-Class', 'GLE', 'GLS', 'AMG GT'],
            'BMW' => ['7 Series', '5 Series', 'X7', 'X5', 'M5'],
            'Audi' => ['A8', 'A6', 'Q8', 'Q7', 'RS7'],
            'Porsche' => ['911', 'Panamera', 'Cayenne', 'Taycan', 'Macan'],
            'Lamborghini' => ['Huracán', 'Urus', 'Aventador'],
            'Ferrari' => ['F8 Tributo', 'Roma', 'Portofino', '812 Superfast'],
            'Rolls-Royce' => ['Phantom', 'Ghost', 'Cullinan', 'Wraith'],
            'Bentley' => ['Continental GT', 'Flying Spur', 'Bentayga'],
            // Premium Brands
            'Tesla' => ['Model S', 'Model X', 'Model 3', 'Model Y'],
            'Lexus' => ['LS', 'ES', 'RX', 'LX', 'LC'],
            'Range Rover' => ['Sport', 'Velar', 'Evoque', 'Defender'],
            // Standard Brands
            'Toyota' => ['Camry', 'Corolla', 'RAV4', 'Highlander'],
            'Honda' => ['Accord', 'Civic', 'CR-V', 'Pilot'],
            'Chevrolet' => ['Malibu', 'Tahoe', 'Suburban', 'Corvette'],
        ];

        // Premium car images from Unsplash
        $carImages = [
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600', // White sports car
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600', // Black luxury sedan
            'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600', // Sports car
            'https://images.unsplash.com/photo-1537984822441-cff330075342?w=1600', // Luxury interior
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600', // Audi front view
            'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1600', // BMW
            'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600', // Mercedes
            'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=1600', // Porsche
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600', // Tesla
            'https://images.unsplash.com/photo-1612810436541-c0e0e9c75c60?w=1600', // Range Rover
        ];

        $brand = fake()->randomElement(array_keys($brands));
        $model = fake()->randomElement($brands[$brand]);

        $brand = $this->faker->randomElement(array_keys($brands));
        $model = $this->faker->randomElement($brands[$brand]);

        return [
            'car_category_id' => CarCategory::factory(),
            'brand' => $brand,
            'model' => $model,
            'year' => $this->faker->numberBetween(2018, 2024),
            'license_plate' => strtoupper($this->faker->bothify('???-####')),
            'vin' => strtoupper($this->faker->bothify('?????????????????')),
            'color' => $this->faker->randomElement(['Black', 'White', 'Silver', 'Blue', 'Red', 'Gray']),
            'mileage' => $this->faker->numberBetween(5000, 50000),
            'fuel_type' => $this->faker->randomElement(FuelType::cases()),
            'transmission' => $this->faker->randomElement(Transmission::cases()),
            'seats' => $this->faker->randomElement([2, 4, 5, 7]),
            'status' => CarStatus::Available,
            'is_active' => true,
            'image' => $this->faker->randomElement($carImages),
        ];
    }

    /**
     * Configure the factory after making.
     */
    public function configure(): static
    {
        return $this->afterMaking(function (\App\Models\Car $car) {
            // Set daily_rate from category if not already set
            if ($car->daily_rate === null && $car->car_category_id) {
                $category = \App\Models\CarCategory::find($car->car_category_id);
                if ($category) {
                    $car->daily_rate = $category->daily_rate;
                }
            }
        });
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
