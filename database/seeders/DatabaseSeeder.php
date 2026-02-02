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

        // Seed locations and categories
        $this->call([
            LocationSeeder::class,
            CarCategorySeeder::class,
        ]);

        // Create 30 cars across all categories
        $categories = CarCategory::all();
        $categories->each(function ($category) {
            Car::factory()->count(4)->create([
                'car_category_id' => $category->id,
            ]);
        });

        // Mark 8 random cars as featured for homepage
        Car::inRandomOrder()->limit(8)->update(['is_featured' => true]);

        // Set some cars to different statuses
        Car::inRandomOrder()->limit(3)->update(['status' => CarStatus::Rented]);
        Car::inRandomOrder()->limit(2)->update(['status' => CarStatus::Maintenance]);

        // Create customers
        Customer::factory()->count(15)->create();

        // Create bookings with payments
        $customers = Customer::all();
        $cars = Car::where('is_active', true)->get();
        $locations = Location::where('is_active', true)->get();

        // Completed bookings with payments
        for ($i = 0; $i < 8; $i++) {
            $booking = Booking::factory()->completed()->create([
                'customer_id' => $customers->random()->id,
                'car_id' => $cars->random()->id,
                'pickup_location_id' => $locations->random()->id,
                'dropoff_location_id' => $locations->random()->id,
            ]);

            Payment::factory()->completed()->create([
                'booking_id' => $booking->id,
                'amount' => $booking->total_amount,
            ]);
        }

        // Active bookings with partial payments
        for ($i = 0; $i < 4; $i++) {
            $booking = Booking::factory()->active()->create([
                'customer_id' => $customers->random()->id,
                'car_id' => $cars->random()->id,
                'pickup_location_id' => $locations->random()->id,
                'dropoff_location_id' => $locations->random()->id,
            ]);

            Payment::factory()->completed()->create([
                'booking_id' => $booking->id,
                'amount' => $booking->deposit_amount,
            ]);
        }

        // Pending bookings (no payments yet)
        for ($i = 0; $i < 5; $i++) {
            Booking::factory()->create([
                'customer_id' => $customers->random()->id,
                'car_id' => $cars->random()->id,
                'pickup_location_id' => $locations->random()->id,
                'dropoff_location_id' => $locations->random()->id,
                'status' => BookingStatus::Pending,
            ]);
        }
    }
}
