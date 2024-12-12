<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::factory()->count(10)->create();
        $restaurants = Restaurant::factory()->count(10)->create();

        foreach ($users as $user) {
            foreach ($restaurants->random(3) as $restaurant) {
                Review::factory()->create([
                    'user_id' => $user->id,
                    'restaurant_id' => $restaurant->id,
                ]);
            }
        }
    }
}
