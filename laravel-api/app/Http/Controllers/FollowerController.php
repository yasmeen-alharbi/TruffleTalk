<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    /**
     * FollowerController constructor.
     *
     * @param User $user
     */
    public function __construct(protected User $user) {}

    /**
     * Follow a given user.
     *
     * @param Request $request
     * @param int $followedId
     * @return JsonResponse
     */
    public function follow(Request $request, int $followedId): JsonResponse
    {
        if (!$this->user->newQuery()->find($followedId)) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $followerUser = $request->user();

        if ($followerUser->id === $followedId) {
            return response()->json(['message' => 'Users cannot follow themselves'], 400);
        }

        $now = now();

        $followerUser->following()->syncWithoutDetaching([$followedId => [
            'created_at' => $now,
            'updated_at' => $now,
        ]]);

        return response()->json(['message' => 'Successfully followed the user']);
    }
}
