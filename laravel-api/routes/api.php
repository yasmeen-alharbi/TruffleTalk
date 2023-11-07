<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
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

Route::middleware(['auth:sanctum'])
    ->get('/test', function () {
        return ['data' => 'Hello World! You are authenticated'];
    });

$limiter = config('fortify.limiters.login');

Route::post(RoutePath::for('login', '/login'), [AuthenticatedSessionController::class, 'store'])
    ->middleware(array_filter([
        'guest:'.config('fortify.guard'),
        $limiter ? 'throttle:'.$limiter : null,
    ]));

Route::post(RoutePath::for('logout', '/logout'), [AuthenticatedSessionController::class, 'destroy']);

if (Features::enabled(Features::registration())) {
    Route::post(RoutePath::for('register.store', '/register'), [RegisteredUserController::class, 'store'])
        ->middleware(['guest']);
}
