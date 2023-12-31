<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * LikeController constructor.
     *
     * @param Post $post
     */
    public function __construct(protected Post $post) {}

    /**
     * Creates a user's like for a post.
     *
     * @param Request $request
     * @param int $postId
     * @return JsonResponse
     */
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

    /**
     * Deletes a user's like on a post.
     *
     * @param Request $request
     * @param int $postId
     * @return JsonResponse
     */
    public function destroy(Request $request, int $postId): JsonResponse
    {
        $post = $this->post->newQuery()->where('id', $postId)->first();

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $post->likes()->where('user_id', $request->user()->id)->delete();

        return response()->json(['post' => new PostResource($post)]);
    }
}
