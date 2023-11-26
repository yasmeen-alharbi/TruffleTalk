<?php

use App\Http\Controllers\AuthTokenController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('guest')->group(
    function () {
        Route::post('/auth/token', [AuthTokenController::class, 'store'])
            ->name('login');

        if (Features::enabled(Features::registration())) {
            Route::post('/register', [RegisteredUserController::class, 'store'])
                ->name('register');
        }

        Route::get('/posts', [PostController::class, 'index'])
            ->name('posts.index');

        Route::get('/posts/{id}', [PostController::class, 'show'])
            ->name('posts.show');
    }
);

Route::middleware('auth:sanctum')->group(
    function () {
        Route::delete('/auth/token', [AuthTokenController::class, 'destroy'])
            ->name('logout');

        Route::post('/posts', [PostController::class, 'store'])
            ->name('posts.store');

        Route::delete('/posts/{id}', [PostController::class, 'destroy'])
            ->name('posts.destroy');

        Route::post('/posts/{id}/likes', [LikeController::class, 'store'])
            ->name('likes.store');

        Route::delete('/posts/{id}/likes', [LikeController::class, 'destroy'])
            ->name('likes.destroy');

        Route::post('/posts/{id}/comments', [CommentController::class, 'store'])
            ->name('comments.store');

        Route::delete('/posts/{id}/comments', [CommentController::class, 'destroy'])
            ->name('comments.destroy');

        Route::get('/followed/posts', [PostController::class, 'followed'])
            ->name('posts.followed');

        Route::get('/recommended/posts', [PostController::class, 'recommended'])
            ->name('posts.recommended');

        Route::get('/users', [UserController::class, 'index'])
            ->name('users.index');

        Route::post('/users/{id}/follow', [UserController::class, 'follow'])
            ->name('users.follow');

        Route::delete('/users/{id}/unfollow', [UserController::class, 'unfollow'])
            ->name('users.unfollow');
    }
);
