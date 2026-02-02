<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Display the account dashboard.
     */
    public function dashboard(Request $request)
    {
        $user = $request->user();
        
        // Get booking stats
        $bookings = $user->bookings()->with('car')->get();
        $stats = [
            'total' => $bookings->count(),
            'upcoming' => $bookings->whereIn('status', ['confirmed', 'pending'])->count(),
            'completed' => $bookings->where('status', 'completed')->count(),
            'active' => $bookings->where('status', 'active')->count(),
        ];

        // Get recent bookings
        $recentBookings = $user->bookings()
            ->with(['car', 'pickupLocation'])
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get()
            ->map(fn ($booking) => $this->transformBooking($booking));

        return Inertia::render('account/dashboard', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'stats' => $stats,
            'recentBookings' => $recentBookings,
        ]);
    }

    /**
     * Display the user's bookings list.
     */
    public function bookings(Request $request)
    {
        $user = $request->user();
        
        $bookings = $user->bookings()
            ->with(['car', 'customer', 'pickupLocation', 'dropoffLocation', 'payments'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($booking) => $this->transformBooking($booking));

        return Inertia::render('account/bookings/index', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Display a specific booking.
     */
    public function showBooking(Request $request, $booking)
    {
        $user = $request->user();
        
        $booking = $user->bookings()
            ->with(['car', 'customer', 'pickupLocation', 'dropoffLocation', 'payments'])
            ->findOrFail($booking);

        return Inertia::render('account/bookings/show', [
            'booking' => $this->transformBooking($booking),
        ]);
    }

    /**
     * Transform booking for frontend.
     */
    private function transformBooking($booking): array
    {
        return [
            'id' => $booking->id,
            'booking_number' => $booking->booking_number,
            'status' => $booking->status->value,
            'status_label' => $booking->status->getLabel(),
            'status_color' => $booking->status->getColor(),
            'car' => [
                'id' => $booking->car->id,
                'name' => "{$booking->car->year} {$booking->car->brand} {$booking->car->model}",
                'image' => $booking->car->image,
            ],
            'pickup_location' => $booking->pickupLocation->name,
            'dropoff_location' => $booking->dropoffLocation->name,
            'pickup_date' => $booking->pickup_date->format('M d, Y'),
            'dropoff_date' => $booking->dropoff_date->format('M d, Y'),
            'total_days' => $booking->total_days,
            'subtotal' => $booking->subtotal,
            'tax_amount' => $booking->tax_amount,
            'total_amount' => $booking->total_amount,
            'deposit_amount' => $booking->deposit_amount,
            'total_paid' => $booking->total_paid,
            'balance_due' => $booking->balance_due,
            'payment_token' => $booking->payment_token,
            'created_at' => $booking->created_at->format('M d, Y'),
        ];
    }
}
