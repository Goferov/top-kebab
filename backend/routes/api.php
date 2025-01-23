<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('restaurants', RestaurantController::class)
    ->only(['index', 'show']);

Route::apiResource('restaurants', RestaurantController::class)
    ->only(['store', 'update', 'destroy', 'togglePublish'])
    ->middleware(['auth:sanctum', 'throttle:api']);

Route::put('/restaurants/{restaurant}/toggle-publish',
    [RestaurantController::class, 'togglePublish']
)->middleware(['auth:sanctum', 'throttle:api'])
    ->name('restaurants.togglePublish');

Route::apiResource('restaurants.reviews', ReviewController::class)
    ->scoped()
    ->only(['index', 'show']);

Route::apiResource('restaurants.reviews', ReviewController::class)
    ->scoped()
    ->only(['store', 'destroy'])
    ->middleware(['auth:sanctum', 'throttle:api']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware(['auth:sanctum']);
Route::post('/change-password', [AuthController::class, 'changePassword'])
    ->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'getUser'])
    ->middleware('auth:sanctum');
