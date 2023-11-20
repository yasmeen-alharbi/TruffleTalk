<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * CommentController constructor.
     *
     * @param Post $post
     */
    public function __construct(protected Post $post) {}
}
