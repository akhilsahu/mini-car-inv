import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { SharedService } from '../shared/shared.service';
@Injectable({
  providedIn: 'root'
})
export class CarModelService { 
  public sValidator:any;
  constructor(private api:ApiService,public shared:SharedService) { }
  addCarModel(data:any){

  	this.api.post('api/car-model',data)
  			.subscribe(
  				(data)=>{console.log(data)}, 
  				(err) => { 
						 console.log(err);
							
			}) ; 
  }

  addUploadCarmodel(data:any)
  {  
    this.sValidator=[];
    this.shared.showHideLoader(true); 
    var formData = new FormData();
     
    if(typeof this.shared.files != undefined)
     { Array.from(this.shared.files).forEach(f => formData.append('files[]',f))

     }
    formData.append('formData',JSON.stringify(data));
    formData.append('manufacturer_id',data.manufacturer_id)
    formData.append('model_name',data.model_name)
    formData.append('color',data.color)
    formData.append('manufacture_year',data.manufacture_year)
    formData.append('note',data.note)
    formData.append('registration_no',data.registration_no)
    formData.append('count',data.count)
    console.log(this.shared.files, formData);
    return  this.api.postNoHeader('api/car-model',formData).toPromise()
        .then(
          (data)=>{ 
            this.shared.showHideLoader(false); return data;  
            }, 
          (err) => { 
            this.shared.showHideLoader(false); return this.sValidator = err; 
           })
  }
  deleteCarModel(data:any){

    return  this.api.delete('api/car-model?id='+data )
        ; 
  }
}
