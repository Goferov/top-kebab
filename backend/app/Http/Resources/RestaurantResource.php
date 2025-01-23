<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image' => $this->image,
            'email' => $this->email,
            'website' => $this->website,
            'phone' => $this->phone,
            'publicate' => $this->publicate,
            'average_rate' => $this->whenLoaded('reviews', fn() => $this->reviews->avg('rate') ? round($this->reviews->avg('rate'), 1) : 0),
            'address' => new AddressResource($this->whenLoaded('address')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews'))
        ];
    }
}
