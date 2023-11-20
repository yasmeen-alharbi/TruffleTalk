<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * LikeController constructor.
     *
     * @param Like $like
     */
    public function __construct(protected Like $like) {}
}
