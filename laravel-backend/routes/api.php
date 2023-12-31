<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AdminAuthController;

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
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});

Route::controller(AdminAuthController::class)->group(function () {
    Route::post('adminLogin', 'login');
    Route::post('adminRegister', 'register');
    Route::post('adminLogout', 'logout');
    Route::post('adminRefresh', 'refresh');

});

Route::post('products/{product}/categories', [ProductController::class, 'assignCategories']);
Route::post('products/{product}/usersCart', [ProductController::class, 'assignToCart']);
Route::post('products/{product}/usersFav', [ProductController::class, 'assignToFav']);
Route::get('products_category/{category_filter}',[ProductController::class, 'getProducts'] );
Route::get('products_favorites/{user_id}',[ProductController::class, 'getFavorites'] );
Route::get('products_cart/{user_id}',[ProductController::class, 'getCart'] );

Route::resource('categories', CategoryController::class);
Route::resource('products', ProductController::class);
Route::resource('cart', CartController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
