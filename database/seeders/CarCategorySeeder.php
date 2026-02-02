<?php

namespace Database\Seeders;

use App\Models\CarCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CarCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Exotic',
                'slug' => 'exotic',
                'description' => 'Rare and exclusive supercars for the ultimate driving experience',
                'daily_rate' => 1200.00,
                'is_active' => true,
            ],
            [
                'name' => 'Luxury Sedan',
                'slug' => 'luxury-sedan',
                'description' => 'Premium sedans combining comfort, performance, and elegance',
                'daily_rate' => 350.00,
                'is_active' => true,
            ],
            [
                'name' => 'Sports Car',
                'slug' => 'sports-car',
                'description' => 'High-performance vehicles for those who crave excitement',
                'daily_rate' => 550.00,
                'is_active' => true,
            ],
            [
                'name' => 'SUV Premium',
                'slug' => 'suv-premium',
                'description' => 'Spacious luxury SUVs perfect for families or groups',
                'daily_rate' => 400.00,
                'is_active' => true,
            ],
            [
                'name' => 'Electric Luxury',
                'slug' => 'electric-luxury',
                'description' => 'Cutting-edge electric vehicles with zero emissions',
                'daily_rate' => 300.00,
                'is_active' => true,
            ],
            [
                'name' => 'Convertible',
                'slug' => 'convertible',
                'description' => 'Open-top driving with style and sophistication',
                'daily_rate' => 450.00,
                'is_active' => true,
            ],
            [
                'name' => 'Business Class',
                'slug' => 'business-class',
                'description' => 'Professional vehicles for executive travel',
                'daily_rate' => 250.00,
                'is_active' => true,
            ],
            [
                'name' => 'Compact Premium',
                'slug' => 'compact-premium',
                'description' => 'Smaller luxury vehicles ideal for city driving',
                'daily_rate' => 180.00,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            CarCategory::create($category);
        }
    }
}
