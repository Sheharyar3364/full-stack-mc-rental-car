<?php

namespace App\Filament\Widgets;

use App\Enums\BookingStatus;
use App\Enums\CarStatus;
use App\Models\Booking;
use App\Models\Car;
use App\Models\Customer;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalBookings = Booking::count();
        $activeRentals = Booking::where('status', BookingStatus::Active)->count();
        $availableCars = Car::where('status', CarStatus::Available)->where('is_active', true)->count();
        $totalRevenue = Booking::where('status', BookingStatus::Completed)->sum('total_amount');
        $totalCustomers = Customer::count();
        $pendingBookings = Booking::where('status', BookingStatus::Pending)->count();

        return [
            Stat::make('Total Bookings', $totalBookings)
                ->description('All time bookings')
                ->descriptionIcon('heroicon-o-clipboard-document-list')
                ->color('primary'),

            Stat::make('Active Rentals', $activeRentals)
                ->description('Currently on rent')
                ->descriptionIcon('heroicon-o-key')
                ->color('success'),

            Stat::make('Available Cars', $availableCars)
                ->description('Ready to rent')
                ->descriptionIcon('heroicon-o-truck')
                ->color('info'),

            Stat::make('Total Revenue', '$' . number_format($totalRevenue, 2))
                ->description('From completed rentals')
                ->descriptionIcon('heroicon-o-currency-dollar')
                ->color('success'),

            Stat::make('Customers', $totalCustomers)
                ->description('Registered customers')
                ->descriptionIcon('heroicon-o-users')
                ->color('gray'),

            Stat::make('Pending Bookings', $pendingBookings)
                ->description('Awaiting confirmation')
                ->descriptionIcon('heroicon-o-clock')
                ->color('warning'),
        ];
    }
}
