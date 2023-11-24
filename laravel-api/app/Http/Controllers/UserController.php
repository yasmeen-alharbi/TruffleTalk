<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
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
        $searchTerm = null;

        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
        }

        $users = $this->user->newQuery()
            ->when($searchTerm, function ($query) use ($searchTerm) {
                $query->where('name', 'LIKE', "%$searchTerm%")
                    ->orWhere('username', 'LIKE', "%$searchTerm%");
            })
            ->get();

        return UserResource::collection($users);
    }
}
