import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators, FormControl,ValidatorFn,AbstractControl} from '@angular/forms';
import { CarModelService } from '../services/carModel/car-model.service';
import { ManufacturerService } from '../services/manufacturer/manufacturer.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss'],
  providers: [ CarModelService,ManufacturerService ]
})
export class AddModelComponent implements OnInit {
  mForm: FormGroup;	
  
  constructor( private formBuilder: FormBuilder,
               public carModel: CarModelService,
               public manufacturer: ManufacturerService) {

                
              }

  ngOnInit() {
    this.getManufacturers();
  	this.mForm = this.formBuilder.group({
    		            manufacturer_id:  ['',Validators.required],
                    model_name:       ['',Validators.required],
                    color:            ['',Validators.required],
                    manufacture_year: ['',
                                         [Validators.required, 
                                          Validators.min(1886), 
                                          Validators.max(new Date().getFullYear())]
                                      ],
                    note:             ['',Validators.required],
                    registration_no:  ['',Validators.required],
                    count:            ['',Validators.required]
				});
  }
    get f() { return this.mForm.controls; }

   
    
  getManufacturers(){
        this.manufacturer.getManufacturer();

  }  
  async onAddModel(){
		  		
		  		if (this.mForm.invalid) {
	            return;
	        }
         
         var res= await this.carModel.addUploadCarmodel( this.mForm.value);
          if(typeof this.carModel.sValidator.status!=undefined && this.carModel.sValidator.status==400)
          {
            Object.keys(this.carModel.sValidator.error).forEach(function(key, index) {
             let control = this.mForm.controls[key];
             let eMsg='';
             for(let m of this.carModel.sValidator.error[key])
             {
                 eMsg+=m;

             }
             control.setErrors({backend: {someProp: eMsg}});
            

           }, this);
             
             
          }
          else{
            alert(res);
          }
	  	}
}
