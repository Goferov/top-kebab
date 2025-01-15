<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
            'restaurant_id' => $this->restaurant_id,
            'user_id' => $this->user_id,
            'rate' => $this->rate,
            'review' => $this->review,
            'created_at' => $this->created_at,
            'user_name' => $this->whenLoaded('user', function () {
                return $this->user->name;
            }),
        ];
    }
}
