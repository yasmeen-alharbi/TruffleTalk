<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'username' => 'test_username',
            'email' => 'test@example.com',
            'email_verified_at' => null,
        ]);

        Post::factory()->count(5)->create();
    }
}
