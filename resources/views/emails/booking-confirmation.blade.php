<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #1a73e8 0%, #1557b0 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .content {
            padding: 40px 30px;
        }
        .booking-number {
            background: #e3f2fd;
            color: #1976d2;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0;
        }
        .car-details {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #e0e0e0;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #666;
        }
        .value {
            color: #333;
            text-align: right;
        }
        .total-row {
            background: #1a73e8;
            color: white;
            padding: 20px;
            margin: 20px -30px 0;
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: bold;
        }
        .footer {
            background: #f9f9f9;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0 0 10px 0;">Booking Confirmed! 🎉</h1>
            <p style="margin: 0; opacity: 0.9;">Thank you for choosing MC Rental Cars</p>
        </div>
        
        <div class="content">
            <p style="font-size: 16px;">Dear {{ $booking->customer->first_name }},</p>
            
            <p>Your booking has been confirmed! We're excited to provide you with an exceptional driving experience.</p>
            
            <div class="booking-number">
                Booking #{{ $booking->booking_number }}
            </div>
            
            <h2 style="color: #1a73e8; font-size: 20px;">Vehicle Details</h2>
            <div class="car-details">
                <h3 style="margin: 0 0 10px 0; font-size: 18px;">{{ $booking->car->year }} {{ $booking->car->brand }} {{ $booking->car->model }}</h3>
                <div class="detail-row">
                    <span class="label">Category</span>
                    <span class="value">{{ $booking->car->category->name }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Transmission</span>
                    <span class="value">{{ $booking->car->transmission->value }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Fuel Type</span>
                    <span class="value">{{ $booking->car->fuel_type->value }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Seats</span>
                    <span class="value">{{ $booking->car->seats }}</span>
                </div>
            </div>
            
            <h2 style="color: #1a73e8; font-size: 20px;">Rental Details</h2>
            <div class="car-details">
                <div class="detail-row">
                    <span class="label">Pickup Location</span>
                    <span class="value">{{ $booking->pickupLocation->name }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Pickup Date</span>
                    <span class="value">{{ $booking->pickup_date->format('M d, Y h:i A') }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Dropoff Location</span>
                    <span class="value">{{ $booking->dropoffLocation->name }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Dropoff Date</span>
                    <span class="value">{{ $booking->dropoff_date->format('M d, Y h:i A') }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Total Days</span>
                    <span class="value">{{ $booking->total_days }}</span>
                </div>
            </div>
            
            <h2 style="color: #1a73e8; font-size: 20px;">Payment Summary</h2>
            <div class="car-details">
                <div class="detail-row">
                    <span class="label">Daily Rate</span>
                    <span class="value">${{ number_format($booking->daily_rate, 2) }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Subtotal ({{ $booking->total_days }} days)</span>
                    <span class="value">${{ number_format($booking->subtotal, 2) }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Tax</span>
                    <span class="value">${{ number_format($booking->tax_amount, 2) }}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Deposit Paid</span>
                    <span class="value">${{ number_format($booking->deposit_amount, 2) }}</span>
                </div>
            </div>
            
            <div class="total-row">
                <span>Total Amount</span>
                <span>${{ number_format($booking->total_amount, 2) }}</span>
            </div>
            
            <p style="margin-top: 30px; padding: 20px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <strong>Important:</strong> Please bring a valid driver's license and the credit card used for booking when picking up your vehicle.
            </p>
        </div>
        
        <div class="footer">
            <p><strong>Questions?</strong> Contact us at {{ config('mail.from.address') }}</p>
            <p style="margin: 10px 0 0 0;">MC Rental Cars | Beyond First Class</p>
        </div>
    </div>
</body>
</html>
