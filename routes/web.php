<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\JournalController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

/*
|--------------------------------------------------------------------------
| Frontend Routes
|--------------------------------------------------------------------------
*/

// Home
Route::get('/', [HomeController::class, 'index'])->name('home');

// Fleet / Cars
Route::get('/cars', [CarController::class, 'index'])->name('cars.index');
Route::get('/cars/{car}', [CarController::class, 'show'])->name('cars.show');
Route::get('/fleet', [CarController::class, 'index'])->name('fleet'); // Alias

// Contact
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Newsletter
// Route::post('/newsletter/subscribe', [App\Http\Controllers\NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');

// Bookings
Route::get('/booking/create', [App\Http\Controllers\BookingController::class, 'create'])->name('bookings.create');
Route::post('/booking', [App\Http\Controllers\BookingController::class, 'store'])->name('bookings.store');
Route::get('/booking/{booking}/payment', [App\Http\Controllers\BookingController::class, 'payment'])->name('bookings.payment');
Route::get('/booking/{booking}/payment/success', [App\Http\Controllers\BookingController::class, 'paymentSuccess'])->name('bookings.payment.success');
Route::get('/booking/{booking}/payment/cancel', [App\Http\Controllers\BookingController::class, 'paymentCancel'])->name('bookings.payment.cancel');
Route::get('/booking/{booking}/confirmation', [App\Http\Controllers\BookingController::class, 'confirmation'])->name('bookings.confirmation');
Route::post('/booking/check-availability', [App\Http\Controllers\BookingController::class, 'checkAvailability'])->name('bookings.check-availability');

// Balance Payment (public with secure token)
Route::get('/payment/balance/{token}', [App\Http\Controllers\BalancePaymentController::class, 'show'])->name('payment.balance');
Route::post('/payment/balance/{token}/process', [App\Http\Controllers\BalancePaymentController::class, 'processPayment'])->name('payment.balance.process');
Route::get('/payment/balance/{token}/success', [App\Http\Controllers\BalancePaymentController::class, 'success'])->name('payment.balance.success');
Route::get('/payment/balance/{token}/cancel', [App\Http\Controllers\BalancePaymentController::class, 'cancel'])->name('payment.balance.cancel');


// Services (placeholder - renders contact for now)
Route::get('/services', [ContactController::class, 'index'])->name('services');

// Experiences
Route::get('/experiences', [ExperienceController::class, 'index'])->name('experiences.index');
Route::get('/experiences/{id}', [ExperienceController::class, 'show'])->name('experiences.show');
Route::get('/experience/{id}', [ExperienceController::class, 'show']); // Alias

// Journal
Route::get('/journal', [JournalController::class, 'index'])->name('journal.index');
Route::get('/journal/{id}', [JournalController::class, 'show'])->name('journal.show');

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
   
    Route::get('dashboard', function () {
        return redirect()->route('account.dashboard');
    })->name('dashboard');

    // User Account Routes
    Route::get('/account', [App\Http\Controllers\AccountController::class, 'dashboard'])->name('account.dashboard');
    Route::get('/account/bookings', [App\Http\Controllers\AccountController::class, 'bookings'])->name('account.bookings');
    Route::get('/account/bookings/{booking}', [App\Http\Controllers\AccountController::class, 'showBooking'])->name('account.bookings.show');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
