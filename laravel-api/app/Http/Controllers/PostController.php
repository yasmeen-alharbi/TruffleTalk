<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * PostController constructor.
     *
     * @param Post $post
     */
    public function __construct(protected Post $post) {}

    /**
     * Creates a post.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'mushroom' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads/posts', 'public');
            $data['image'] = $imagePath;
        }

        $post = new Post($data);
        $post->user_id = $request->user()->id;
        $post->save();

        return response()->json(['post' => new PostResource($post)], 201);
    }

    /**
     * Get the post with the given id.
     *
     * @param string $id
     * @return PostResource[]
     */
    public function show(string $id): array
    {
        $post = $this->post->findOrFail($id);
        return ['post' => new PostResource($post)];
    }
}
