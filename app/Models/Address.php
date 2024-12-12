<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'street',
        'city',
        'postal_code',
        'house_no',
        'apartment_no',
    ];

    // one to one
    public function restaurants(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class, 'id', 'address_id');
    }
}
