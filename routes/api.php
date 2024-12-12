<?php

use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('restaurants', RestaurantController::class);
Route::apiResource('restaurants.reviews', ReviewController::class)
    ->scoped(['review' => 'restaurant']);
