<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Address;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Restaurant::class);

        $query = Restaurant::with(['address', 'reviews']);

        $this->applyFilters($query, $request);

        $this->applySorting($query, $request);

        $this->applyLimit($query, $request);

        $limit = $request->input('limit', 50);
        $query->limit($limit);

        $restaurants = $query->get();

        return RestaurantResource::collection($restaurants);
    }

    private function applyFilters($query, Request $request)
    {
        if ($city = $request->input('city')) {
            $query->whereHas('address', function ($q) use ($city) {
                $q->where('city', 'LIKE', "%{$city}%");
            });
        }

        if ($name = $request->input('name')) {
            $query->where('name', 'LIKE', "%{$name}%");
        }

        if ($request->has('publicate')) {
            $publicateParam = $request->input('publicate');
            $publicate = $publicateParam === 'true' ? true : false;
            $query->where('publicate', $publicate);
        }
    }

    private function applyLimit($query, Request $request) {
        if ($request->has('limit')) {
            $limit = (int)$request->input('limit');
            $query->limit($limit);
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
                $query->withAvg('reviews', 'rate')
                    ->orderBy('reviews_avg_rate', 'desc');
                break;
            case 6:
                $query->withAvg('reviews', 'rate')
                    ->orderBy('reviews_avg_rate', 'asc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('create', Restaurant::class);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'phone' => 'nullable|string|max:16',
            'address.street' => 'required|string|max:255',
            'address.city' => 'required|string|max:255',
            'address.postal_code' => 'required|string|max:20',
            'address.house_no' => 'required|string|max:10',
            'address.apartment_no' => 'nullable|string|max:10',
        ]);

        $address = Address::create([
            'street' => $validatedData['address']['street'],
            'city' => $validatedData['address']['city'],
            'postal_code' => $validatedData['address']['postal_code'],
            'house_no' => $validatedData['address']['house_no'],
            'apartment_no' => $validatedData['address']['apartment_no'] ?? null,
        ]);

        $restaurant = new Restaurant([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'] ?? null,
            'image' => $this->handleImage(null, $validatedData['image'] ?? null), // Obsługa obrazu
            'email' => $validatedData['email'] ?? null,
            'website' => $validatedData['website'] ?? null,
            'phone' => $validatedData['phone'] ?? null,
            'address_id' => $address->id,
            'publicate' => true,
        ]);

        $restaurant->save();

        return new RestaurantResource($restaurant->load('address'));
    }


    private function handleImage($restaurant, $imageData = null, $deleteFile = false)
    {
        if ($deleteFile && $restaurant->image) {
            if (Storage::disk('public')->exists("uploads/{$restaurant->image}")) {
                Storage::disk('public')->delete("uploads/{$restaurant->image}");
            }
            return null;
        }

        if ($imageData) {
            $fileName = time() . '_image.png';

            Storage::disk('public')->put("uploads/{$fileName}", base64_decode($imageData));

            if ($restaurant && $restaurant->image && Storage::disk('public')->exists("uploads/{$restaurant->image}")) {
                Storage::disk('public')->delete("uploads/{$restaurant->image}");
            }

            return $fileName;
        }

        return $restaurant->image ?? null;
    }


    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        Gate::authorize('view', $restaurant);
        return new RestaurantResource($restaurant->load(['address', 'reviews.user']));
    }



    public function update(Request $request, Restaurant $restaurant)
    {
        Gate::authorize('update', $restaurant);

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string', // Obsługa obrazu w Base64
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'phone' => 'nullable|string|max:16',
            'address.street' => 'sometimes|string|max:255',
            'address.city' => 'sometimes|string|max:255',
            'address.postal_code' => 'sometimes|string|max:20',
            'address.house_no' => 'sometimes|string|max:10',
            'address.apartment_no' => 'nullable|string|max:10',
            'delete_file' => 'nullable|boolean',
        ]);

        $restaurant->update([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'] ?? null,
            'image' => $this->handleImage($restaurant, $validatedData['image'] ?? null, $validatedData['delete_file'] ?? false),
            'email' => $validatedData['email'] ?? null,
            'website' => $validatedData['website'] ?? null,
            'phone' => $validatedData['phone'] ?? null,
        ]);

        if ($restaurant->address) {
            $restaurant->address->update([
                'street' => $validatedData['address']['street'] ?? $restaurant->address->street,
                'city' => $validatedData['address']['city'] ?? $restaurant->address->city,
                'postal_code' => $validatedData['address']['postal_code'] ?? $restaurant->address->postal_code,
                'house_no' => $validatedData['address']['house_no'] ?? $restaurant->address->house_no,
                'apartment_no' => $validatedData['address']['apartment_no'] ?? $restaurant->address->apartment_no,
            ]);
        }

        return new RestaurantResource($restaurant->load('address'));
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        Gate::authorize('delete', $restaurant);

        $restaurant->reviews()->delete();

        if ($restaurant->address) {
            $restaurant->address->delete();
        }

        $restaurant->delete();
        return response(status: 204);
    }

    public function togglePublish(Restaurant $restaurant)
    {
        Gate::authorize('togglePublish', $restaurant);

        $restaurant->publicate = !$restaurant->publicate;
        $restaurant->save();

        $status = $restaurant->publicate ? 'published' : 'unpublished';

        return response()->json([
            'message' => "Restaurant {$status} successfully.",
            'restaurant' => new RestaurantResource($restaurant)
        ], 200);
    }
}
