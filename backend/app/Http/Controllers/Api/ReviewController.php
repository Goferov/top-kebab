<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Restaurant;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Restaurant $restaurant)
    {
        Gate::authorize('viewAny', Review::class);
        $reviews = $restaurant->reviews()->latest();

        return ReviewResource::collection($reviews->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Restaurant $restaurant)
    {
        Gate::authorize('create', Review::class);
        $validatedData = $request->validate([
            'rate' => 'required|integer|min:1|max:5',
            'review' => 'required|string',
        ]);

        $existingReview = $restaurant->reviews()
            ->where('user_id', $request->user()->id)
            ->first();

        if ($existingReview) {
            return response()->json(['message' => 'Review exists!'], 422);
        }

        $review = $restaurant->reviews()->create([
            'user_id' => $request->user()->id,
            'rate'    => $validatedData['rate'],
            'review'  => $validatedData['review'],
        ]);

        return new ReviewResource($review->load('user'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant, Review $review)
    {
        Gate::authorize('view', $review);
        return new ReviewResource($review);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant, Review $review)
    {
        Gate::authorize('delete', $review);
        $review->delete();
        return response(status: 204);
    }
}
