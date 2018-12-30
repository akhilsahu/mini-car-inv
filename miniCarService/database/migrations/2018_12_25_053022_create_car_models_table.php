<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car_models', function (Blueprint $table) {
            $table->increments('id');
            $table->string('model_name');
            $table->integer('manufacturer_id')->unsigned();;
            $table->foreign('manufacturer_id')->references('id')->on('manufacturers');
            $table->string('registration_no');   
            $table->string('color');   
            $table->year('manufacture_year');   
            $table->longText('note');   
            $table->integer('count'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('car_models');
    }
}
