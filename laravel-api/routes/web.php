<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

$limiter = config('fortify.limiters.login');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(array_filter([
        'guest',
        $limiter ? 'throttle:' . $limiter : null,
    ]))
    ->name('login');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');
