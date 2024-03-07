<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
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
        Route::post('refresh', 'refresh');
        Route::middleware('auth:api')->group(function () {
            Route::post('logout', 'logout');
            Route::get('profile', 'getProfile');
            Route::patch('profile', 'updateProfile');
            Route::put('profile/password', 'changePassword');
        });
    });

Route::controller(UploadController::class)
    ->prefix('uploads')
    ->middleware('auth:api')
    ->group(function () {
        Route::post('/', 'store');
    });

Route::controller(PostController::class)
    ->prefix('posts')
    ->middleware('auth:api')
    ->group(function () {
        Route::post('/', 'store');
        Route::patch('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    });

Route::controller(CityController::class)
    ->prefix('cities')
    ->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
    });

Route::controller(UserController::class)
    ->prefix('users')
    ->middleware('auth:api')
    ->group(function () {
        Route::get('/', 'index');
    });
