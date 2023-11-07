<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;
use Laravel\Fortify\RoutePath;

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

Route::middleware('auth:sanctum')->group(
    function () {
        Route::get('/test', function () {
            return ['data' => 'Hello World! You are authenticated with Sanctum'];
        });
    }
);

if (Features::enabled(Features::registration())) {
    Route::post(RoutePath::for('register.store', '/register'), [RegisteredUserController::class, 'store'])
        ->middleware(['guest']);
}
