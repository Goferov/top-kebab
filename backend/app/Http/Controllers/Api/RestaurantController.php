<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRestaurantRequest;
use App\Http\Requests\UpdateRestaurantRequest;
use App\Http\Resources\RestaurantResource;
use App\Models\Address;
use App\Models\Restaurant;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Helpers\CacheHelper;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    use AuthorizesRequests;

    private CacheHelper $cacheHelper;

    public function __construct(CacheHelper $cacheHelper)
    {
        $this->cacheHelper = $cacheHelper;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Restaurant::class);

        $cacheKey = $this->cacheHelper->generateKey('restaurants', $request->all());

        $restaurants = $this->cacheHelper->remember($cacheKey, 3600, function () use ($request) {
            $query = Restaurant::with(['address', 'reviews']);
            $this->applyFilters($query, $request);
            $this->applySorting($query, $request);
            $this->applyLimit($query, $request);

            return $query->get();
        });

        return RestaurantResource::collection($restaurants);
    }

    private function applyFilters($query, Request $request)
    {
        if ($city = $request->input('city')) {
            $query->whereHas('address', function ($q) use ($city) {
                $q->whereRaw('LOWER(city) LIKE ?', ['%' . strtolower($city) . '%']);
            });
        }

        if ($name = $request->input('name')) {
            $query->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($name) . '%']);
        }

        if ($request->has('publicate')) {
            $query->where('publicate', $request->boolean('publicate'));
        }
    }

    private function applyLimit($query, Request $request)
    {
        if ($request->has('limit')) {
            $query->limit((int)$request->input('limit'));
        }
    }

    private function applySorting($query, Request $request)
    {
        switch ($request->input('sort')) {
            case 2:
                $query->orderBy('created_at', 'asc');
                break;
            case 3:
                $query->orderBy('name', 'asc');
                break;
            case 4:
                $query->orderBy('name', 'desc');
                break;
            case 5:
                $query->withAvg('reviews', 'rate')->orderBy('reviews_avg_rate', 'desc');
                break;
            case 6:
                $query->withAvg('reviews', 'rate')->orderBy('reviews_avg_rate', 'asc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRestaurantRequest $request)
    {
        $validatedData = $request->validated();

        $address = Address::create($validatedData['address']);

        $restaurant = new Restaurant([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'] ?? null,
            'image' => $this->handleImage(null, $validatedData['image'] ?? null),
            'email' => $validatedData['email'] ?? null,
            'website' => $validatedData['website'] ?? null,
            'phone' => $validatedData['phone'] ?? null,
            'address_id' => $address->id,
            'publicate' => true,
        ]);

        $restaurant->save();

        $this->cacheHelper->flush();

        return new RestaurantResource($restaurant->load('address'));
    }


    private function handleImage($restaurant, $imageData = null, $deleteFile = false)
    {
        if ($deleteFile && $restaurant?->image) {
            Storage::disk('public')->delete("uploads/{$restaurant->image}");
            return null;
        }

        if ($imageData) {
            $fileName = time() . '_image.png';
            Storage::disk('public')->put("uploads/{$fileName}", base64_decode($imageData));

            if ($restaurant?->image) {
                Storage::disk('public')->delete("uploads/{$restaurant->image}");
            }

            return $fileName;
        }

        return $restaurant?->image;
    }


    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        $this->authorize('view', $restaurant);

        $cacheKey = $this->cacheHelper->generateKey('restaurant', ['id' => $restaurant->id]);

        $restaurantDetails = $this->cacheHelper->remember($cacheKey, 3600, function () use ($restaurant) {
            return $restaurant->load(['address', 'reviews.user']);
        });

        return new RestaurantResource($restaurantDetails);
    }


    public function update(UpdateRestaurantRequest $request, Restaurant $restaurant)
    {
        $validatedData = $request->validated();

        $restaurant->update([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'] ?? null,
            'image' => $this->handleImage($restaurant, $validatedData['image'] ?? null, $validatedData['delete_file'] ?? false),
            'email' => $validatedData['email'] ?? null,
            'website' => $validatedData['website'] ?? null,
            'phone' => $validatedData['phone'] ?? null,
        ]);

        $restaurant->address?->update($validatedData['address'] ?? []);

        $this->cacheHelper->flush();

        return new RestaurantResource($restaurant->load('address'));
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        $this->authorize('delete', $restaurant);

        $restaurant->reviews()->delete();

        $restaurant->reviews()->delete();
        $restaurant->address?->delete();
        $restaurant->delete();

        $this->cacheHelper->flush();

        return response(status: 204);
    }

    public function togglePublish(Restaurant $restaurant)
    {
        $this->authorize('togglePublish', $restaurant);

        $restaurant->publicate = !$restaurant->publicate;
        $restaurant->save();

        $this->cacheHelper->flush();

        $status = $restaurant->publicate ? 'published' : 'unpublished';

        return response()->json([
            'message' => "Restaurant {$status} successfully.",
            'restaurant' => new RestaurantResource($restaurant),
        ]);
    }
}
