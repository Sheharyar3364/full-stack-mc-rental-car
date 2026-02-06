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
        Schema::create('customer_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->string('type'); // license_front, license_back, passport, id_card_front, id_card_back, proof_of_address
            $table->string('path'); // Secure file path
            $table->string('original_filename')->nullable();
            $table->string('mime_type')->nullable();
            $table->string('status')->default('pending'); // pending, verified, rejected
            $table->timestamp('verified_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_documents');
    }
};
