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
     * Display a listing of all available cars with filters.
     */
    public function index(): Response
    {
        $query = Car::with('category')
            ->where('is_active', true)
            ->where('status', CarStatus::Available);

        // Search filter
        if (request('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search) {
                $q->where('brand', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%");
            });
        }

        // Brand filter
        if (request('brands')) {
            $brands = is_array(request('brands')) ? request('brands') : [request('brands')];
            $query->whereIn('brand', $brands);
        }

        // Category filter
        if (request('categories')) {
            $categories = is_array(request('categories')) ? request('categories') : [request('categories')];
            $query->whereIn('car_category_id', $categories);
        }

        // Price range filter
        if (request('min_price')) {
            $query->where(function ($q) {
                $minPrice = request('min_price');
                $q->where('daily_rate', '>=', $minPrice)
                    ->orWhereHas('category', function ($cq) use ($minPrice) {
                        $cq->where('daily_rate', '>=', $minPrice);
                    });
            });
        }

        if (request('max_price')) {
            $query->where(function ($q) {
                $maxPrice = request('max_price');
                $q->where('daily_rate', '<=', $maxPrice)
                    ->orWhereHas('category', function ($cq) use ($maxPrice) {
                        $cq->where('daily_rate', '<=', $maxPrice);
                    });
            });
        }

        // Sorting
        $sortBy = request('sort', 'featured');
        match ($sortBy) {
            'price-low' => $query->orderByRaw('COALESCE(daily_rate, (SELECT daily_rate FROM car_categories WHERE id = cars.car_category_id)) ASC'),
            'price-high' => $query->orderByRaw('COALESCE(daily_rate, (SELECT daily_rate FROM car_categories WHERE id = cars.car_category_id)) DESC'),
            'newest' => $query->orderBy('year', 'desc'),
            default => $query->orderBy('is_featured', 'desc')->orderBy('created_at', 'desc'),
        };

        // Pagination
        $perPage = request('per_page', 12);
        $paginated = $query->paginate($perPage);

        $cars = $paginated->through(fn($car) => $this->transformCar($car));

        // Get all categories and brands for filters
        $allCategories = CarCategory::all()->map(fn($cat) => [
            'id' => $cat->id,
            'name' => $cat->name,
            'slug' => strtolower(str_replace(' ', '-', $cat->name)),
        ]);

        $allBrands = Car::where('is_active', true)
            ->distinct()
            ->pluck('brand')
            ->filter()
            ->sort()
            ->values();

        return Inertia::render('cars/index', [
            'cars' => $cars->items(),
            'pagination' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'from' => $paginated->firstItem(),
                'to' => $paginated->lastItem(),
            ],
            'categories' => $allCategories,
            'brands' => $allBrands,
            'filters' => [
                'search' => request('search'),
                'brands' => request('brands', []),
                'categories' => request('categories', []),
                'min_price' => request('min_price'),
                'max_price' => request('max_price'),
                'sort' => request('sort', 'featured'),
            ],
        ]);
    }

    /**
     * Display the specified car details.
     */
    public function show(Car $car): Response
    {
        $car->load('category');

        $carData = $this->transformCar($car, true);

        // Get booked dates for this car (pending and confirmed bookings)
        $bookedDates = $car->bookings()
            ->whereIn('status', [
                \App\Enums\BookingStatus::Pending,
                \App\Enums\BookingStatus::Confirmed,
                \App\Enums\BookingStatus::Active,
            ])
            ->where('dropoff_date', '>=', now())
            ->get()
            ->map(fn($booking) => [
                'start' => $booking->pickup_date->format('Y-m-d'),
                'end' => $booking->dropoff_date->format('Y-m-d'),
            ]);

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
            'bookedDates' => $bookedDates,
        ]);
    }

    /**
     * Transform a car model to array for frontend.
     */
    private function transformCar(Car $car, bool $detailed = false): array
    {
        $data = [
            'id' => $car->id,
            'name' => "{$car->year} {$car->brand} {$car->model}",
            'brand' => $car->brand,
            'type' => $car->category?->name ?? 'Luxury',
            'year' => $car->year,
            'image' => $car->image ?? 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
            'price' => $car->daily_rate ?? $car->category?->daily_rate ?? 450,
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
