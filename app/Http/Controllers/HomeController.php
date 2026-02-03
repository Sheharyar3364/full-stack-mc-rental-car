<?php

namespace App\Http\Controllers;

use App\Enums\CarStatus;
use App\Models\Car;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the home page with featured cars.
     */
    public function index(): Response
    {
        $featuredCars = Car::with(['category', 'location'])
            ->where('is_active', true)
            ->where('is_featured', true)
            ->where('status', CarStatus::Available)
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get()
            ->map(function($car) {
                // Handle image path - prefer featured_image for home page, then main image, then first in gallery
                $imagePath = $car->featured_image ?: $car->image;
                if (empty($imagePath) && !empty($car->images)) {
                    $imagePath = is_array($car->images) ? $car->images[0] : null;
                }

                if (empty($imagePath)) {
                    $image = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800';
                } elseif (str_starts_with($imagePath, 'http')) {
                    $image = $imagePath;
                } else {
                    $image = asset('storage/' . $imagePath);
                }

                return [
                    'id' => $car->id,
                    'name' => "{$car->year} {$car->brand} {$car->model}",
                    'brand' => $car->brand,
                    'type' => $car->category?->name ?? 'Luxury',
                    'image' => $image,
                    'price' => (float) ($car->daily_rate ?? $car->category?->daily_rate ?? 450),
                    'seats' => $car->seats,
                    'fuel' => $car->fuel_type?->getLabel() ?? $car->fuel_type?->value ?? 'Petrol',
                    'transmission' => $car->transmission?->getLabel() ?? $car->transmission?->value ?? 'Automatic',
                    'location' => $car->location?->name,
                ];
            });

        $locations = \App\Models\Location::where('is_active', true)
            ->get()
            ->map(fn($loc) => [
                'id' => $loc->id,
                'name' => $loc->name,
            ]);

        return Inertia::render('home', [
            'featuredCars' => $featuredCars,
            'locations' => $locations,
        ]);
    }
}
