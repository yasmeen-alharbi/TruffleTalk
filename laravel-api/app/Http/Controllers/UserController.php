<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    /**
     * UserController constructor.
     *
     * @param User $user
     */
    public function __construct(protected User $user) {}

    /**
     * Gets all the users; filters by search term if there
     * is one provided.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $userId = $request->user()->id;
        $searchTerm = null;

        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
        }

        $users = $this->user->newQuery()
            ->where('id', '!=', $userId) // Exclude the current user
            ->when($searchTerm, function ($query) use ($searchTerm) {
                $query->where(function ($innerQuery) use ($searchTerm) {
                    $innerQuery->where('name', 'LIKE', "%$searchTerm%")
                        ->orWhere('username', 'LIKE', "%$searchTerm%");
                });
            })
            ->get();

        return UserResource::collection($users);
    }

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


    /**
     * Unfollow a given user.
     *
     * @param Request $request
     * @param int $followedId
     * @return JsonResponse
     */
    public function unfollow(Request $request, int $followedId): JsonResponse
    {
        if (!$this->user->newQuery()->find($followedId)) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->user()->following()->detach($followedId);

        return response()->json(['message' => 'Successfully unfollowed the user']);
    }
}
