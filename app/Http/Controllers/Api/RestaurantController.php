<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Models\Address;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Restaurant::class);
        return RestaurantResource::collection(Restaurant::with('address')->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
//        DB::transaction(function() {
//            //
//        });

        Gate::authorize('create', Restaurant::class);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
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

        $restaurant = Restaurant::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'] ?? null,
            'image' => $validatedData['image'] ?? null,
            'email' => $validatedData['email'] ?? null,
            'website' => $validatedData['website'] ?? null,
            'phone' => $validatedData['phone'] ?? null,
            'address_id' => $address->id,
        ]);

        return new RestaurantResource($restaurant->load('address'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        Gate::authorize('view', Restaurant::class);
        return new RestaurantResource($restaurant->load(['address', 'reviews']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        Gate::authorize('update', Restaurant::class);
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'phone' => 'nullable|string|max:16',
            'address.street' => 'sometimes|string|max:255',
            'address.city' => 'sometimes|string|max:255',
            'address.postal_code' => 'sometimes|string|max:20',
            'address.house_no' => 'sometimes|string|max:10',
            'address.apartment_no' => 'nullable|string|max:10',
        ]);


        $restaurant->update([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'] ?? null,
            'image' => $validatedData['image'] ?? null,
            'email' => $validatedData['email'] ?? null,
            'website' => $validatedData['website'] ?? null,
            'phone' => $validatedData['phone'] ?? null,
        ]);

        if ($restaurant->address) {
            $restaurant->address->update([
                'street' => $validatedData['address']['street'],
                'city' => $validatedData['address']['city'],
                'postal_code' => $validatedData['address']['postal_code'],
                'house_no' => $validatedData['address']['house_no'],
                'apartment_no' => $validatedData['address']['apartment_no'] ?? null,
            ]);
        }

        return new RestaurantResource($restaurant->load('address'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        Gate::authorize('delete', Restaurant::class);
        $restaurant->delete();
        return response(status: 204);
    }
}
