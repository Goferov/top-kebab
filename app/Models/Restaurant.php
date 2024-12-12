<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Restaurant extends Model
{

    use HasFactory;

    protected $fillable = [
        'address_id',
        'name',
        'description',
        'image',
        'email',
        'website',
        'publicate',
        'status',
        'phone',
    ];

    // One to one
    public function address(): HasOne
    {
        return $this->hasOne(Address::class, 'address_id');
    }

    // One to Many
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'restaurant_id');
    }

}
