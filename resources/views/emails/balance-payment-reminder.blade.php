<x-mail::message>
    # Complete Your Booking Payment

    Dear {{ $booking->customer->first_name }},

    Thank you for booking with **MCRENTALCARS**! Your booking has been confirmed and we're excited to have you as our
    customer.

    ## Booking Details

    **Booking Number:** {{ $booking->booking_number }}

    **Vehicle:** {{ $booking->car->year }} {{ $booking->car->brand }} {{ $booking->car->model }}

    **Rental Period:** {{ $booking->pickup_date->format('M d, Y') }} to {{ $booking->dropoff_date->format('M d, Y') }}
    ({{ $booking->total_days }} days)

    **Pickup Location:** {{ $booking->pickupLocation->name }}

    ---

    ## Payment Summary

    | Description | Amount |
    |:---|---:|
    | Total Rental | ${{ number_format($booking->total_amount, 2) }} |
    | Deposit Paid | -${{ number_format($booking->total_paid, 2) }} |
    | **Balance Due** | **${{ number_format($balanceDue, 2) }}** |

    ---

    Please complete your remaining balance payment before your pickup date to ensure a smooth rental experience.

    <x-mail::button :url="$paymentUrl" color="primary">
        Pay ${{ number_format($balanceDue, 2) }} Now
    </x-mail::button>

    If you have any questions or need assistance, please don't hesitate to contact us.

    Thanks,<br>
    {{ config('app.name') }}

    <x-mail::subcopy>
        If you're having trouble clicking the button, copy and paste this URL into your browser: {{ $paymentUrl }}
    </x-mail::subcopy>
</x-mail::message>
