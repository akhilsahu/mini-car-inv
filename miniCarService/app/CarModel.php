<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarModel extends Model
{
    //
		protected $fillable = ['model_name','manufacturer_id','registration_no','color','manufacture_year','note','count'];
		
		public function manufacturer(){
			return $this->belongsTo('App\Manufacturer');
		}
		public function CarPictures(){
			return $this->hasMany('App\CarPictures');
		}
}
