<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->json('images')->nullable()->after('image');
            $table->string('featured_image')->nullable()->after('images');
            $table->boolean('is_featured')->default(false)->after('is_active');
        });
    }

    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn(['images', 'featured_image', 'is_featured']);
        });
    }
};
