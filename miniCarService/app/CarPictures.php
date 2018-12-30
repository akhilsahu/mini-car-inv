<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarPictures extends Model
{
    //
		protected $fillable = ['src','car_model_id'];
		
		public function CarModel(){
			return $this->belongsTo('App\CarModel');
		}
}
