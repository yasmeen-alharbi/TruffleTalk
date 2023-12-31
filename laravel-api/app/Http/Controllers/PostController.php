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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:16384',
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
     * Gets all the posts; sorted by top-rated post.
     * Will be used by guests.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        $posts = $this->post->newQuery()
            ->with(['comments' => function ($query) {
                $query->orderBy('created_at', 'DESC');
            }, 'user:id,username'])
            ->withCount(['likes', 'comments'])
            ->orderByRaw('(likes_count + (3 * comments_count)) DESC, created_at DESC')
            ->get();

        return PostResource::collection($posts);
    }

    /**
     * Gets all user's followed posts; sorted chronologically.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function followed(Request $request): AnonymousResourceCollection
    {
        $currentUser = $request->user();
        $afterTimestamp = $currentUser->last_posts_fetched_at;

        $followingIds = $currentUser->following()->pluck('followed_id')->toArray();
        $followingIds[] = $currentUser->id;

        $followedPosts = $this->post->newQuery()
            ->with(['comments' => function ($query) {
                $query->orderBy('created_at', 'DESC');
            }, 'user:id,username'])
            ->when($afterTimestamp, function ($query) use ($afterTimestamp) {
                $query->where('created_at', '>', $afterTimestamp);
            })
            ->whereIn('user_id', $followingIds)
            ->orderBy('created_at','DESC')
            ->get();

        $currentUser->last_posts_fetched_at = now();
        $currentUser->save();

        return PostResource::collection($followedPosts);
    }

    /**
     * Gets recommended posts from users that the user is not
     * following based on mushroom types that the user has
     * interacted with before; sorts by top-rated.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function recommended(Request $request): AnonymousResourceCollection
    {
        $currentUser = $request->user();

        $likedPostIds = $currentUser->likes()->pluck('post_id')->toArray();
        $commentedPostIds = $currentUser->comments()->pluck('post_id')->toArray();
        $postsOfInterest = array_unique(array_merge($likedPostIds, $commentedPostIds));

        $mushroomsOfInterest = $this->post->newQuery()
            ->whereIn('id', $postsOfInterest)
            ->distinct('mushroom')
            ->pluck('mushroom')
            ->toArray();

        if (empty($postsOfInterest)) {
            $recommendedPosts = $this->post->newQuery()
                ->whereNotIn('user_id', function ($query) use ($currentUser) {
                $query->select('followed_id')
                    ->from('followers')
                    ->where('follower_id', $currentUser->id);
            })
                ->where('user_id', '!=', $currentUser->id)
                ->withCount(['likes', 'comments'])
                ->with(['comments' => function ($query) {
                    $query->orderBy('created_at', 'desc');
                }])
                ->orderByRaw('(likes_count + (3 * comments_count)) DESC, created_at DESC')
                ->take(100)
                ->get();
        } else {
            $recommendedPosts = $this->post->newQuery()
                ->with(['comments' => function ($query) {
                    $query->orderBy('created_at', 'DESC');
                }, 'user:id,username'])
                ->whereIn('mushroom', $mushroomsOfInterest)
                ->where('user_id', '!=', $currentUser->id)
                ->whereNotIn('user_id', function ($query) use ($currentUser) {
                    $query->select('followed_id')
                        ->from('followers')
                        ->where('follower_id', $currentUser->id);
                })
                ->withCount(['likes', 'comments'])
                ->orderByRaw('(likes_count + (3 * comments_count)) DESC, created_at DESC')
                ->take(100)
                ->get();

            if ($recommendedPosts->isEmpty()) {
                $recommendedPosts = $this->post->newQuery()
                    ->whereNotIn('user_id', function ($query) use ($currentUser) {
                        $query->select('followed_id')
                            ->from('followers')
                            ->where('follower_id', $currentUser->id);
                    })
                    ->where('user_id', '!=', $currentUser->id)
                    ->withCount(['likes', 'comments'])
                    ->with(['comments' => function ($query) {
                        $query->orderBy('created_at', 'desc');
                    }])
                    ->orderByRaw('(likes_count + (3 * comments_count)) DESC, created_at DESC')
                    ->take(100)
                    ->get();
            }
        }

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
