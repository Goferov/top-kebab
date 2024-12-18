<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Http\Resources\ReviewResource;
use App\Models\Restaurant;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Restaurant $restaurant)
    {
        $reviews = $restaurant->reviews()->latest();

        return ReviewResource::collection(
            $reviews->paginate()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Restaurant $restaurant)
    {

        $validatedData = $request->validate([
            'rate' => 'required|integer|min:1|max:5',
            'review' => 'required|string',
        ]);

        $review = $restaurant->reviews()->create([
            'user_id' => $request->user()->id,
            'rate'    => $validatedData['rate'],
            'review'  => $validatedData['review'],
        ]);

        return new ReviewResource($review);
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant, Review $review)
    {
        return new ReviewResource($review);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant, Review $review)
    {
        $review->delete();
        return response(status: 204);
    }
}
