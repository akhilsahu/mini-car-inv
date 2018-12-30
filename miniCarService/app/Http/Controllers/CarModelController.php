<?php

namespace App\Http\Controllers;
use App\Manufacturer;
use App\CarModel;
use App\CarPictures;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CarModelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $carData=json_decode($request->input('formData'), true);

 
        $validator = Validator::make($carData, [
             
            "model_name" => "required|max:180|unique:car_models,model_name,NULL,manufacturer_id".$carData['manufacturer_id'],
            "manufacturer_id"=> "required|numeric",
            "registration_no"=> "required|max:180",
            "color"=> "required|max:180",
            "manufacture_year"=> 'required|digits:4|integer|min:1886|max:'.(date('Y')),
            "note"=> "required|min:3|max:1000",
            "count"=> "required|numeric"
        ]);
        if ($validator->fails()) {
            return response(
            $validator->errors(),
                400
            );
        } 
        $carModel = CarModel::create($request->all());
        if($request->hasFile('files'))
            {
                    $dataValidate= $this->validate($request, [
                            'files.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:100',
                            ]);
                    foreach ($request->file('files') as $key => $image) {

                        $getimageName = time() . '-' . $image->getClientOriginalName();
                        $carPicture = new CarPictures();                    
                        $carPicture->src = $image->move(('uploads'), $getimageName);
                        $carModel->CarPictures()->save($carPicture);  
                           
                    }
        }
      


        return response()->json("Data Saved Successfully", 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CarModel  $carModel
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,CarModel $carModel)
    {
        //
        $data=($request->all()); 
        $dataR=CarModel::with( 'CarPictures' )->find($data['id']); 
       return Response()->json($dataR,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CarModel  $carModel
     * @return \Illuminate\Http\Response
     */
    public function edit(CarModel $carModel)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CarModel  $carModel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CarModel $carModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CarModel  $carModel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,CarModel $carModel)
    {
        //
        $data=($request->all());
        $data=CarModel::findOrFail($data['id'])->delete();
        return response()->json($data, 201);

    }
}
