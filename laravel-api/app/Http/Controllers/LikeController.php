<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * LikeController constructor.
     *
     * @param Like $like
     * @param Post $post
     */
    public function __construct(protected Like $like, protected Post $post) {}

    public function store(Request $request, int $postId): JsonResponse
    {
        $post = $this->post->newQuery()->where('id', $postId)->first();

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $userId = $request->user()->id;

        if (!$post->likes()->where('user_id', $userId)->first()) {
            $post->likes()->create([
                'user_id' => $userId,
            ]);
        }

        return response()->json(['post' => new PostResource($post)], 201);
    }
}
