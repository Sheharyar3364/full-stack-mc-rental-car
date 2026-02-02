<?php

namespace Database\Seeders;

use App\Enums\BookingStatus;
use App\Enums\CarStatus;
use App\Models\Booking;
use App\Models\Car;
use App\Models\CarCategory;
use App\Models\Customer;
use App\Models\Location;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@mcrentalcars.com',
            'password' => Hash::make('password'),
        ]);

        // Create car categories
        $categories = [
            ['name' => 'Economy', 'slug' => 'economy', 'daily_rate' => 35.00, 'description' => 'Budget-friendly options for everyday driving'],
            ['name' => 'Compact', 'slug' => 'compact', 'daily_rate' => 45.00, 'description' => 'Small cars, great for city driving'],
            ['name' => 'Midsize', 'slug' => 'midsize', 'daily_rate' => 55.00, 'description' => 'Comfortable sedans for longer trips'],
            ['name' => 'Full Size', 'slug' => 'full-size', 'daily_rate' => 65.00, 'description' => 'Spacious sedans for families'],
            ['name' => 'SUV', 'slug' => 'suv', 'daily_rate' => 85.00, 'description' => 'Versatile vehicles for any adventure'],
            ['name' => 'Luxury', 'slug' => 'luxury', 'daily_rate' => 150.00, 'description' => 'Premium vehicles for special occasions'],
            ['name' => 'Van', 'slug' => 'van', 'daily_rate' => 95.00, 'description' => 'Large capacity for groups'],
        ];

        foreach ($categories as $category) {
            CarCategory::create($category);
        }

        // Create locations
        $locations = Location::factory()->count(3)->create();

        // Create cars for each category
        CarCategory::all()->each(function ($category) {
            Car::factory()->count(3)->create([
                'car_category_id' => $category->id,
            ]);
        });

        // Set some cars to different statuses
        Car::inRandomOrder()->limit(2)->update(['status' => CarStatus::Rented]);
        Car::inRandomOrder()->limit(1)->update(['status' => CarStatus::Maintenance]);

        // Create customers
        Customer::factory()->count(10)->create();

        // Create bookings
        $customers = Customer::all();
        $cars = Car::where('is_active', true)->get();
        $locations = Location::where('is_active', true)->get();

        // Create some completed bookings
        for ($i = 0; $i < 5; $i++) {
            $booking = Booking::factory()->completed()->create([
                'customer_id' => $customers->random()->id,
                'car_id' => $cars->random()->id,
                'pickup_location_id' => $locations->random()->id,
                'dropoff_location_id' => $locations->random()->id,
            ]);

            // Add payment for completed bookings
            Payment::factory()->completed()->create([
                'booking_id' => $booking->id,
                'amount' => $booking->total_amount,
            ]);
        }

        // Create some active bookings
        for ($i = 0; $i < 3; $i++) {
            Booking::factory()->active()->create([
                'customer_id' => $customers->random()->id,
                'car_id' => $cars->random()->id,
                'pickup_location_id' => $locations->random()->id,
                'dropoff_location_id' => $locations->random()->id,
            ]);
        }

        // Create some pending bookings
        for ($i = 0; $i < 4; $i++) {
            Booking::factory()->create([
                'customer_id' => $customers->random()->id,
                'car_id' => $cars->random()->id,
                'pickup_location_id' => $locations->random()->id,
                'dropoff_location_id' => $locations->random()->id,
            ]);
        }
    }
}
