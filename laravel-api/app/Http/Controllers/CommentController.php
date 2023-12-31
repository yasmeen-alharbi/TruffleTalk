<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * CommentController constructor.
     *
     * @param Post $post
     */
    public function __construct(protected Post $post) {}

    /**
     * Creates a user's comment for a post.
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

        $data = $request->validate([
            'content' => 'required|string|max:255',
        ]);

        $post->comments()->create([
            'user_id' => $request->user()->id,
            'content' => $data['content'],
        ]);

        $post = $post->fresh(['comments' => function ($query) {
            $query->orderBy('created_at', 'DESC');
        }]);

        return response()->json(['post' => new PostResource($post)], 201);
    }

    /**
     * Deletes a user's comment from a post.
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

        $data = $request->validate([
            'comment_id' => 'required|exists:comments,id',
        ]);

        $post->comments()
            ->where('user_id', $request->user()->id)
            ->where('id', $data['comment_id'])
            ->delete();

        return response()->json(['post' => new PostResource($post)]);
    }
}
