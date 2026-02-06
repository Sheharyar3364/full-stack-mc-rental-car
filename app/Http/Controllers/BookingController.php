<?php

namespace App\Http\Controllers;

use App\Enums\BookingStatus;
use App\Models\Booking;
use App\Models\Car;
use App\Models\Customer;
use App\Models\Location;
use App\Models\Payment;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;
use Filament\Notifications\Notification;
use Filament\Actions\Action;

class BookingController extends Controller
{
    /**
     * Display the booking form.
     */
    public function create(Request $request)
    {
        $carId = $request->input('car_id');
        
        if (!$carId) {
            return redirect()->route('cars.index')
                ->with('error', 'Please select a car to book.');
        }

        $car = Car::with('category')->findOrFail($carId);
        
        if (!$car->is_active || $car->status !== \App\Enums\CarStatus::Available) {
            return redirect()->route('cars.show', $car)
                ->with('error', 'This car is not available for booking.');
        }

        $locations = Location::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(fn($location) => [
                'id' => $location->id,
                'name' => $location->name,
                'city' => $location->city,
                'full_address' => $location->full_address,
                'phone' => $location->phone,
            ]);



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

        return Inertia::render('bookings/create', [
            'car' => $this->transformCar($car),
            'locations' => $locations,
            'bookedDates' => $bookedDates,
        ]);
    }

    /**
     * Store a new booking.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'car_id' => 'required|exists:cars,id',
            'pickup_date' => 'required|date|after_or_equal:today',
            'dropoff_date' => 'required|date|after:pickup_date',
            'pickup_location_id' => 'required|exists:locations,id',
            'dropoff_location_id' => 'required|exists:locations,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'drivers_license_number' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $car = Car::with('category')->findOrFail($request->car_id);

        // Check availability
        $pickupDate = new DateTime($request->pickup_date);
        $dropoffDate = new DateTime($request->dropoff_date);

        if (!$car->isAvailableForDates($pickupDate, $dropoffDate)) {
            return back()
                ->withErrors(['availability' => 'This car is already booked for the selected dates. Please choose different dates or another vehicle.'])
                ->withInput();
        }

        // Calculate pricing
        $days = $pickupDate->diff($dropoffDate)->days + 1;
        $dailyRate = $car->daily_rate ?? $car->category?->daily_rate ?? 500;
        $subtotal = $dailyRate * $days;
        $taxAmount = $subtotal * 0.10; // 10% Tax
        $totalAmount = $subtotal + $taxAmount;
        $depositAmount = $totalAmount * 0.30; // 30% Deposit

        // Ensure user is authenticated
        $user = auth()->user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        // Handle Customer Creation / Retrieval
        $customer = Customer::firstOrCreate(
            ['email' => $user->email],
            [
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'drivers_license_number' => $request->drivers_license_number,
            ]
        );
        
        // Ensure customer is linked to user
        if (!$customer->user_id) {
            $customer->update(['user_id' => $user->id]);
        }

        // Create booking
        $booking = Booking::create([
            'customer_id' => $customer->id,
            'car_id' => $car->id,
            'user_id' => $user->id,
            'pickup_location_id' => $request->pickup_location_id,
            'dropoff_location_id' => $request->dropoff_location_id,
            'pickup_date' => $request->pickup_date,
            'dropoff_date' => $request->dropoff_date,
            'daily_rate' => $dailyRate,
            'total_days' => $days,
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'deposit_amount' => $depositAmount,
            'status' => BookingStatus::Pending,
        ]);

        // Notify Admins
        try {
            $admins = \App\Models\User::all();
            
            foreach ($admins as $admin) {
                Notification::make()
                    ->title('New Booking Created')
                    ->body("New booking #{$booking->booking_number} by {$customer->first_name} {$customer->last_name}")
                    ->actions([
                        Action::make('view')
                            ->button()
                            ->url("/admin/bookings/{$booking->id}/edit"),
                    ])
                    ->sendToDatabase($admin);
            }
        } catch (\Exception $e) {
            \Log::error('Failed to send admin notification for booking: ' . $e->getMessage());
        }

        // Redirect to payment page
        return redirect()->route('bookings.payment', $booking);
    }

    /**
     * Show payment page and create Stripe Checkout session.
     */
    public function payment(Booking $booking)
    {
        if ($booking->status !== BookingStatus::Pending) {
            return redirect()->route('bookings.confirmation', $booking);
        }

        $booking->load('car', 'customer', 'pickupLocation', 'dropoffLocation');

        // Create Stripe Checkout Session
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $session = StripeSession::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => "Car Rental - {$booking->car->full_name}",
                            'description' => "Booking #{$booking->booking_number} - {$booking->total_days} days",
                        ],
                        'unit_amount' => (int)($booking->deposit_amount * 100), // Convert to cents
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('bookings.payment.success', ['booking' => $booking->id]) . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('bookings.payment.cancel', ['booking' => $booking->id]),
                'metadata' => [
                    'booking_id' => $booking->id,
                    'booking_number' => $booking->booking_number,
                ],
            ]);

            return Inertia::render('bookings/payment', [
                'booking' => $this->transformBooking($booking),
                'stripePublicKey' => config('services.stripe.key'),
                'stripeSessionId' => $session->id,
                'stripeCheckoutUrl' => $session->url,  // Add the checkout URL
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Unable to process payment. Please try again.');
        }
    }

    /**
     * Handle successful payment.
     */
    public function paymentSuccess(Request $request, Booking $booking)
    {
        $sessionId = $request->query('session_id');

        if (!$sessionId) {
            return redirect()->route('bookings.payment', $booking);
        }

        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $session = StripeSession::retrieve($sessionId);

            if ($session->payment_status === 'paid') {
                // Record payment
                Payment::create([
                    'booking_id' => $booking->id,
                    'amount' => $booking->deposit_amount,
                    'payment_method' => \App\Enums\PaymentMethod::CreditCard,
                    'payment_type' => \App\Enums\PaymentType::Deposit,
                    'transaction_id' => $session->payment_intent,
                    'status' => \App\Enums\PaymentStatus::Completed,
                    'paid_at' => now(),
                ]);

                // Update booking status
                $booking->update(['status' => BookingStatus::Confirmed]);

                return redirect()->route('bookings.confirmation', $booking);
            }
        } catch (\Exception $e) {
            \Log::error('Payment verification failed: ' . $e->getMessage());
        }

        return redirect()->route('bookings.payment', $booking)
            ->with('error', 'Payment verification failed. Please contact support.');
    }

    /**
     * Handle payment cancellation.
     */
    public function paymentCancel(Booking $booking)
    {
        return redirect()->route('bookings.payment', $booking)
            ->with('warning', 'Payment was cancelled. You can try again when ready.');
    }

    /**
     * Show booking confirmation.
     */
    public function confirmation(Booking $booking)
    {
        $booking->load('car.category', 'customer', 'pickupLocation', 'dropoffLocation', 'payments');

        return Inertia::render('bookings/confirmation', [
            'booking' => $this->transformBooking($booking),
        ]);
    }

    /**
     * Check car availability via AJAX.
     */
    public function checkAvailability(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'car_id' => 'required|exists:cars,id',
            'pickup_date' => 'required|date',
            'dropoff_date' => 'required|date|after:pickup_date',
        ]);

        if ($validator->fails()) {
            return response()->json(['available' => false, 'error' => 'Invalid dates']);
        }

        $car = Car::findOrFail($request->car_id);
        $available = $car->isAvailableForDates(
            new DateTime($request->pickup_date),
            new DateTime($request->dropoff_date)
        );

        return response()->json(['available' => $available]);
    }

    /**
     * Transform car data for frontend.
     */
    private function transformCar(Car $car): array
    {
        // Handle image path
        $imagePath = $car->image;
        if (empty($imagePath) && !empty($car->images)) {
            $imagePath = is_array($car->images) ? $car->images[0] : null;
        }
        if (empty($imagePath)) {
            $imagePath = $car->featured_image;
        }

        if (empty($imagePath)) {
            $image = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800';
        } elseif (str_starts_with($imagePath, 'http')) {
            $image = $imagePath;
        } else {
            $image = asset('storage/' . ltrim($imagePath, '/'));
        }

        return [
            'id' => $car->id,
            'name' => $car->full_name,
            'brand' => $car->brand,
            'model' => $car->model,
            'year' => $car->year,
            'image' => $image,
            'images' => $car->images ?? [$image],
            'price' => (float) ($car->daily_rate ?? $car->category?->daily_rate ?? 500),
            'type' => $car->category?->name ?? 'Luxury',
            'seats' => $car->seats,
            'transmission' => $car->transmission?->getLabel() ?? $car->transmission?->value ?? 'Automatic',
            'fuel' => $car->fuel_type?->getLabel() ?? $car->fuel_type?->value ?? 'Gasoline',
        ];
    }

    /**
     * Transform booking data for frontend.
     */
    private function transformBooking(Booking $booking): array
    {
        return [
            'id' => $booking->id,
            'booking_number' => $booking->booking_number,
            'status' => $booking->status->value,
            'car' => [
                'id' => $booking->car->id,
                'name' => $booking->car->full_name,
                'image' => (function($car) {
                    $imagePath = $car->image;
                    if (empty($imagePath) && !empty($car->images)) {
                        $imagePath = is_array($car->images) ? $car->images[0] : null;
                    }
                    if (empty($imagePath)) {
                        $imagePath = $car->featured_image;
                    }

                    if (empty($imagePath)) {
                        return 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800';
                    } elseif (str_starts_with($imagePath, 'http')) {
                        return $imagePath;
                    } else {
                        return asset('storage/' . ltrim($imagePath, '/'));
                    }
                })($booking->car),
                'type' => $booking->car->category?->name ?? 'Luxury',
            ],
            'customer' => [
                'name' => $booking->customer->full_name,
                'email' => $booking->customer->email,
                'phone' => $booking->customer->phone,
                'verification_status' => $booking->customer->verification_status,
            ],
            'pickup_date' => $booking->pickup_date->format('Y-m-d H:i'),
            'dropoff_date' => $booking->dropoff_date->format('Y-m-d H:i'),
            'pickup_location' => [
                'name' => $booking->pickupLocation->name,
                'address' => $booking->pickupLocation->full_address,
            ],
            'dropoff_location' => [
                'name' => $booking->dropoffLocation->name,
                'address' => $booking->dropoffLocation->full_address,
            ],
            'total_days' => $booking->total_days,
            'daily_rate' => (float) $booking->daily_rate,
            'subtotal' => (float) $booking->subtotal,
            'tax_amount' => (float) $booking->tax_amount,
            'total_amount' => (float) $booking->total_amount,
            'deposit_amount' => (float) $booking->deposit_amount,
            'balance_due' => (float) $booking->balance_due,
            'total_paid' => (float) $booking->total_paid,
        ];
    }
}
