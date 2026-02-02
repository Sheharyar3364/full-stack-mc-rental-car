<?php

namespace App\Http\Controllers;

use App\Enums\CarStatus;
use App\Models\Car;
use App\Models\CarCategory;
use Inertia\Inertia;
use Inertia\Response;

class CarController extends Controller
{
    /**
     * Display a listing of all available cars.
     */
    public function index(): Response
    {
        $cars = Car::with('category')
            ->where('is_active', true)
            ->where('status', CarStatus::Available)
            ->get()
            ->map(fn($car) => $this->transformCar($car));

        $categories = CarCategory::all()->map(fn($cat) => [
            'id' => $cat->id,
            'name' => $cat->name,
            'slug' => strtolower(str_replace(' ', '-', $cat->name)),
        ]);

        $brands = Car::where('is_active', true)
            ->distinct()
            ->pluck('brand')
            ->filter()
            ->values();

        return Inertia::render('cars/index', [
            'cars' => $cars,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    /**
     * Display the specified car details.
     */
    public function show(Car $car): Response
    {
        $car->load('category');

        $carData = $this->transformCar($car, true);

        $relatedCars = Car::with('category')
            ->where('is_active', true)
            ->where('status', CarStatus::Available)
            ->where('id', '!=', $car->id)
            ->where(function ($query) use ($car) {
                $query->where('brand', $car->brand)
                    ->orWhere('car_category_id', $car->car_category_id);
            })
            ->limit(3)
            ->get()
            ->map(fn($c) => $this->transformCar($c));

        return Inertia::render('cars/show', [
            'car' => $carData,
            'relatedCars' => $relatedCars,
        ]);
    }

    /**
     * Transform a car model to array for frontend.
     */
    private function transformCar(Car $car, bool $detailed = false): array
    {
        $data = [
            'id' => $car->id,
            'name' => $car->model,
            'brand' => $car->brand,
            'type' => $car->category?->name ?? 'Sedan',
            'year' => $car->year,
            'image' => $car->image ?? 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
            'price' => (float) $car->daily_rate,
            'seats' => $car->seats,
            'fuel' => $car->fuel_type?->value ?? 'Petrol',
            'transmission' => $car->transmission?->value ?? 'Automatic',
        ];

        if ($detailed) {
            $data = array_merge($data, [
                'description' => $car->description ?? "Experience the ultimate in luxury and performance with the {$car->year} {$car->brand} {$car->model}.",
                'engine' => $car->engine ?? '3.0L Twin Turbo',
                'power' => $car->power ?? '350 HP',
                'topSpeed' => $car->top_speed ?? '250 km/h',
                'acceleration' => $car->acceleration ?? '5.0s',
                'features' => $car->features ?? [
                    'Leather Interior',
                    'Panoramic Sunroof',
                    'GPS Navigation',
                    '360° Camera',
                    'Premium Sound System',
                    'Wireless Charging',
                ],
                'images' => $car->images ?? [
                    $car->image ?? 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600',
                ],
            ]);
        }

        return $data;
    }
}
