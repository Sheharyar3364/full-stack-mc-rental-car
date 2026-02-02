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
        $featuredCars = Car::with('category')
            ->where('is_active', true)
            ->where('is_featured', true)
            ->where('status', CarStatus::Available)
            ->limit(8)
            ->get()
            ->map(fn($car) => [
                'id' => $car->id,
                'name' => "{$car->year} {$car->brand} {$car->model}",
                'brand' => $car->brand,
                'type' => $car->category?->name ?? 'Luxury',
                'image' => $car->image ?? 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
                'price' => $car->daily_rate ?? $car->category?->daily_rate ?? 450,
                'seats' => $car->seats,
                'fuel' => $car->fuel_type?->value ?? 'Petrol',
                'transmission' => $car->transmission?->value ?? 'Automatic',
            ]);

        return Inertia::render('home', [
            'featuredCars' => $featuredCars,
        ]);
    }
}
