<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    public function address()
    {
        return $this->hasOne(Address::class, 'address_id');
    }

    // One to Many
    public function reviews()
    {
        return $this->hasMany(Review::class, 'restaurant_id');
    }

}
