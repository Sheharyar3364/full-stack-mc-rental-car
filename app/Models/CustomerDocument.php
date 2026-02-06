<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'type',
        'path',
        'original_filename',
        'mime_type',
        'status',
        'verified_at',
        'rejection_reason',
        'notes',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
