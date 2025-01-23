<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Restaurant;
use App\Models\Review;
use App\Helpers\CacheHelper;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ReviewController extends Controller
{

    use AuthorizesRequests;

    private CacheHelper $cacheHelper;

    public function __construct(CacheHelper $cacheHelper)
    {
        $this->cacheHelper = $cacheHelper;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Restaurant $restaurant)
    {
        $this->authorize('viewAny', Review::class);

        $cacheKey = $this->cacheHelper->generateKey('reviews', ['restaurant_id' => $restaurant->id]);

        $reviews = $this->cacheHelper->remember($cacheKey, 3600, function () use ($restaurant) {
            return $restaurant->reviews()->latest()->get();
        });

        return ReviewResource::collection($reviews);
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

        $this->cacheHelper->flush();

        return new ReviewResource($review->load('user'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant, Review $review)
    {
        $this->authorize('view', $review);

        $cacheKey = $this->cacheHelper->generateKey('review', ['id' => $review->id]);

        $reviewDetails = $this->cacheHelper->remember($cacheKey, 3600, function () use ($review) {
            return $review;
        });

        return new ReviewResource($reviewDetails);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant, Review $review)
    {
        $this->authorize('delete', $review);

        $review->delete();

        $this->cacheHelper->flush();

        return response(status: 204);
    }
}
