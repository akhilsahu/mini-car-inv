<?php

namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Manufacturer;
use App\CarModel;
use App\CarPictures;
class InventoryController extends Controller
{
    //
    public function get(Request $request){

    	// $dataPages = CarModel::with(['Manufacturer','CarPictures'])->select('id')->paginate($data['perPage'], ['*'], 'page',  $data['page']) ; 
 		$data=$request->all();
    	$dataPages= DB::table('car_models')
            ->join('manufacturers', 'car_models.manufacturer_id', '=', 'manufacturers.id')
            ->select('car_models.id as id','registration_no','manufacture_year','color','note','count', 'manufacturers.name as manufacturer_name','model_name' )
            ->paginate($data['perPage'], ['*'], 'page',  $data['page']);

      	
     	return Response()->json($dataPages,200);
    }
}
