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
            ->where('status', CarStatus::Available)
            ->limit(6)
            ->get()
            ->map(fn($car) => [
                'id' => $car->id,
                'name' => $car->model,
                'brand' => $car->brand,
                'type' => $car->category?->name ?? 'Sedan',
                'image' => $car->image ?? 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
                'price' => (float) $car->daily_rate,
                'seats' => $car->seats,
                'fuel' => $car->fuel_type?->value ?? 'Petrol',
                'transmission' => $car->transmission?->value ?? 'Automatic',
            ]);

        return Inertia::render('home', [
            'featuredCars' => $featuredCars,
        ]);
    }
}
