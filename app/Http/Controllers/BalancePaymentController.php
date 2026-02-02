<?php

namespace App\Http\Controllers;

use App\Enums\BookingStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Enums\PaymentType;
use App\Models\Booking;
use App\Models\Payment;
use Inertia\Inertia;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Stripe;

class BalancePaymentController extends Controller
{
    /**
     * Show the balance payment page.
     */
    public function show(string $token)
    {
        $booking = Booking::where('payment_token', $token)
            ->with(['car', 'customer', 'pickupLocation', 'dropoffLocation', 'payments'])
            ->firstOrFail();

        // Check if there's balance to pay
        if (!$booking->hasBalanceDue()) {
            return redirect()->route('bookings.confirmation', $booking)
                ->with('info', 'This booking has already been fully paid.');
        }

        return Inertia::render('payment/balance', [
            'booking' => $this->transformBooking($booking),
            'balanceDue' => $booking->balance_due,
            'token' => $token,
        ]);
    }

    /**
     * Create Stripe checkout session for balance payment.
     */
    public function processPayment(string $token)
    {
        $booking = Booking::where('payment_token', $token)
            ->with('car', 'customer')
            ->firstOrFail();

        if (!$booking->hasBalanceDue()) {
            return redirect()->route('bookings.confirmation', $booking);
        }

        $balanceDue = $booking->balance_due;

        Stripe::setApiKey(config('services.stripe.secret'));

        $session = StripeSession::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => "Balance Payment - {$booking->car->brand} {$booking->car->model}",
                        'description' => "Booking #{$booking->booking_number} - Remaining Balance",
                    ],
                    'unit_amount' => (int) ($balanceDue * 100),
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('payment.balance.success', $token) . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('payment.balance.cancel', $token),
            'customer_email' => $booking->customer->email,
            'metadata' => [
                'booking_id' => $booking->id,
                'booking_number' => $booking->booking_number,
                'payment_type' => 'balance',
            ],
        ]);

        return Inertia::location($session->url);
    }

    /**
     * Handle successful balance payment.
     */
    public function success(string $token)
    {
        $booking = Booking::where('payment_token', $token)
            ->with('car', 'customer')
            ->firstOrFail();

        $sessionId = request('session_id');

        try {
            Stripe::setApiKey(config('services.stripe.secret'));
            $session = StripeSession::retrieve($sessionId);

            if ($session->payment_status === 'paid') {
                // Record payment
                Payment::create([
                    'booking_id' => $booking->id,
                    'amount' => $booking->balance_due,
                    'payment_method' => PaymentMethod::CreditCard,
                    'payment_type' => PaymentType::Rental,
                    'transaction_id' => $session->payment_intent,
                    'status' => PaymentStatus::Completed,
                    'paid_at' => now(),
                ]);

                return redirect()->route('bookings.confirmation', $booking)
                    ->with('success', 'Balance payment completed successfully!');
            }
        } catch (\Exception $e) {
            \Log::error('Balance payment verification failed: ' . $e->getMessage());
        }

        return redirect()->route('payment.balance', $token)
            ->with('error', 'Payment verification failed. Please contact support.');
    }

    /**
     * Handle cancelled balance payment.
     */
    public function cancel(string $token)
    {
        return redirect()->route('payment.balance', $token)
            ->with('warning', 'Payment was cancelled. You can try again when ready.');
    }

    /**
     * Transform booking for frontend.
     */
    private function transformBooking(Booking $booking): array
    {
        return [
            'id' => $booking->id,
            'booking_number' => $booking->booking_number,
            'status' => $booking->status->value,
            'status_label' => $booking->status->getLabel(),
            'car' => [
                'id' => $booking->car->id,
                'name' => "{$booking->car->year} {$booking->car->brand} {$booking->car->model}",
                'image' => $booking->car->image,
            ],
            'customer' => [
                'name' => $booking->customer->full_name,
                'email' => $booking->customer->email,
            ],
            'pickup_location' => $booking->pickupLocation->name,
            'dropoff_location' => $booking->dropoffLocation->name,
            'pickup_date' => $booking->pickup_date->format('M d, Y H:i'),
            'dropoff_date' => $booking->dropoff_date->format('M d, Y H:i'),
            'total_days' => $booking->total_days,
            'subtotal' => $booking->subtotal,
            'tax_amount' => $booking->tax_amount,
            'total_amount' => $booking->total_amount,
            'deposit_amount' => $booking->deposit_amount,
            'total_paid' => $booking->total_paid,
            'balance_due' => $booking->balance_due,
        ];
    }
}
