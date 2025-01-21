<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Restaurant;
use App\Models\Review;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ReviewController extends Controller
{

    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(Restaurant $restaurant)
    {
        $this->authorize('viewAny', Review::class);
        $reviews = $restaurant->reviews()->latest();

        return ReviewResource::collection($reviews->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewRequest $request, Restaurant $restaurant)
    {
        $existingReview = $restaurant->reviews()
            ->where('user_id', $request->user()->id)
            ->first();

        if ($existingReview) {
            return response()->json(['message' => 'Review already exists!'], 422);
        }

        $review = $restaurant->reviews()->create([
            'user_id' => $request->user()->id,
            'rate'    => $request->validated('rate'),
            'review'  => $request->validated('review'),
        ]);

        return new ReviewResource($review->load('user'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant, Review $review)
    {
        $this->authorize('view', $review);
        return new ReviewResource($review);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant, Review $review)
    {
        $this->authorize('delete', $review);
        $review->delete();
        return response(status: 204);
    }
}
