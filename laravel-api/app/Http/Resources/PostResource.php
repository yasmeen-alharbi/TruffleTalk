<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $request->user();
        $likesCount = $this->likes->count();
        $likedByCurrentUser = $user ? $this->likes->contains('user_id', $user->id) : false;

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'author' => $this->user->username,
            'title' => $this->title,
            'mushroom' => $this->mushroom,
            'description' => $this->description,
            'image' => env('APP_URL') . Storage::url($this->image),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'likes_count' => $likesCount,
            'liked_by_current_user' => $likedByCurrentUser,
            'comments' => CommentResource::collection($this->comments)
        ];
    }
}
