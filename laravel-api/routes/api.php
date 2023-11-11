<?php

use App\Http\Controllers\AuthTokenController;
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
    }
);

Route::middleware('auth:sanctum')->group(
    function () {
        Route::delete('/auth/token', [AuthTokenController::class, 'destroy'])
            ->name('logout');

        Route::get('/test', function () {
            return ['data' => 'You are authenticated with Sanctum'];
        });
    }
);
