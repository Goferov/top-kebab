<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
    public function restaurants(): HasOne
    {
        return $this->hasOne(Restaurant::class);
    }
}
