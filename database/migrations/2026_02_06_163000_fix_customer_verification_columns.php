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
        Schema::table('customers', function (Blueprint $table) {
            // if (Schema::hasColumn('customers', 'verification_token')) {
            //    $table->dropColumn('verification_token');
            // }
            
            if (!Schema::hasColumn('customers', 'verification_status')) {
                $table->string('verification_status')->default('unverified')->after('user_id');
            }
            
            if (!Schema::hasColumn('customers', 'verification_notes')) {
                $table->text('verification_notes')->nullable()->after('verification_status');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn(['verification_status', 'verification_notes']);
            $table->string('verification_token')->nullable();
        });
    }
};
