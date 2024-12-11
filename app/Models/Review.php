<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_id',
        'user_id',
        'rate',
        'review',
        'publicate',
        'status',
    ];


    // many to one
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    // many to one
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
