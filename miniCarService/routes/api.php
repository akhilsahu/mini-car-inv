<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/manufacturer', 'ManufacturerController@store');
Route::get('/manufacturer', 'ManufacturerController@get');

Route::post('/car-model', 'CarModelController@store');
Route::get('/car-model', 'CarModelController@show');

Route::delete('/car-model', 'CarModelController@destroy');

Route::get('/inventory', 'InventoryController@get');
