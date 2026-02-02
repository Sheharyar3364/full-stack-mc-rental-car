<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_number')->unique();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('car_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); // Link to authenticated user (optional)
            $table->foreignId('pickup_location_id')->constrained('locations')->cascadeOnDelete();
            $table->foreignId('dropoff_location_id')->constrained('locations')->cascadeOnDelete();
            $table->dateTime('pickup_date');
            $table->dateTime('dropoff_date');
            $table->dateTime('actual_pickup_date')->nullable();
            $table->dateTime('actual_dropoff_date')->nullable();
            $table->decimal('daily_rate', 10, 2);
            $table->integer('total_days');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->decimal('deposit_amount', 10, 2)->default(0);
            $table->string('status')->default('pending');
            $table->uuid('payment_token')->unique()->nullable(); // Unique token for secure balance payment links
            $table->dateTime('payment_reminder_sent_at')->nullable(); // Track when reminder was sent
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
