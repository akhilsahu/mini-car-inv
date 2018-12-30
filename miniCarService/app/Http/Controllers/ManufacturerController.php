<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Manufacturer;

use Illuminate\Support\Facades\Validator;

class ManufacturerController extends Controller
{
    //

    public function store(Request $request)
    {
    	
    	//$postInput = file_get_contents('php://input');
    	 
		$validator = Validator::make($request->all(), [
        	"name" => "required|unique:manufacturers"
        ]);
		 
	    if ($validator->fails()) {
	        return response(
	            $validator->errors(),
	            400
	        );
	    } 

        $manufacturer = Manufacturer::create($request->all());


        return response()->json("Success", 201);
    }

    public function get()
    {
          return response()->json(Manufacturer::all(), 200);
    }
}
