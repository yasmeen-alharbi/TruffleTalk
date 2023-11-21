<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

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

        $post->load('user:id,username');

        return response()->json(['post' => new PostResource($post)], 201);
    }

    /**
     * Gets all the posts, sorted by top-rated post.
     * Will be used by guests.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        $posts = $this->post->newQuery()
            ->with(['comments', 'user:id,username'])
            ->withCount(['likes', 'comments'])
            ->orderByRaw('likes_count + comments_count DESC')
            ->get();

        return PostResource::collection($posts);
    }

    /**
     * Gets all user's followed posts, sorted chronologically.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function followed(Request $request): AnonymousResourceCollection
    {
        $currentUser = $request->user();

        $followingIds = $currentUser->following()->pluck('followed_id')->toArray();
        $followingIds[] = $currentUser->id;

        $followedPosts = $this->post->newQuery()
            ->with(['comments', 'user:id,username'])
            ->whereIn('user_id', $followingIds)
            ->orderBy('created_at','DESC')
            ->get();

        return PostResource::collection($followedPosts);
    }

    /**
     * Gets recommended posts from users that the user is not
     * following, sorts by top-rated.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function recommended(Request $request): AnonymousResourceCollection
    {
        $currentUser = $request->user();

        $followingIds = $currentUser->following()->pluck('followed_id')->toArray();
        $followedPostsIds = $this->post->newQuery()->whereIn('user_id', $followingIds)->pluck('id')->toArray();

        $recommendedPosts = $this->post->newQuery()
            ->with(['comments', 'user:id,username'])
            ->whereNotIn('user_id', [$currentUser->id])
            ->whereNotIn('id', $followedPostsIds)
            ->withCount(['likes', 'comments'])
            ->orderByRaw('(likes_count + (3 * comments_count)) DESC')
            ->get();

        return PostResource::collection($recommendedPosts);
    }

    /**
     * Get the post with the given id.
     *
     * @param int $id
     * @return PostResource[]
     */
    public function show(int $id): array
    {
        $post = $this->post->with(['comments', 'user:id,username'])->findOrFail($id);

        return ['post' => new PostResource($post)];
    }

    /**
     * Deletes a given post.
     *
     * @param int $id
     * @return void
     */
    public function destroy(int $id): void
    {
        $post = $this->post->findOrFail($id);
        $post->delete();
    }
}
