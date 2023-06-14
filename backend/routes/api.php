<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(AuthController::class)
    ->prefix('auth')
    ->group(function () {
        Route::post('register', 'register');
        Route::post('login', 'login');
        Route::middleware('auth:api')->group(function () {
            Route::get('profile', 'getProfile');
            Route::post('profile', 'updateProfile');
        });
    });

Route::controller(UploadController::class)
    ->prefix('uploads')
    ->group(function () {
        Route::post('/', 'store');
    });
