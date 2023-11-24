<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * UserController constructor.
     *
     * @param User $user
     */
    public function __construct(protected User $user) {}
}
