<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{
	    protected $fillable = ['name'];

    //
	    public function CarModel(){
        return $this->hasMany('App\CarModel');
    }
}
