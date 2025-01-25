<?php

namespace Database\Factories;

use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Restaurant>
 */
class RestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'address_id' => Address::factory(),
            'name' => $this->faker->company(),
            'description' => $this->faker->paragraph(),
            'image' => '',
            'email' => $this->faker->unique()->safeEmail(),
            'website' => $this->faker->domainName(),
            'publicate' => $this->faker->boolean(),
            'phone' => substr($this->faker->phoneNumber(), 0, 16),
        ];
    }
}
