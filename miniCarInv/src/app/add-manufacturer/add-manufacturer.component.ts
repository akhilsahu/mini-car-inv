import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { ManufacturerService} from '../services/manufacturer/manufacturer.service';
import { SharedService } from '../services/shared/shared.service';
@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.scss'],
  providers: [ ManufacturerService]
})
export class AddManufacturerComponent implements OnInit {
		mForm: FormGroup;
 		msg='';

		constructor( private formBuilder: FormBuilder,
					 private mService:ManufacturerService,
					 public shared :  SharedService ) { }

		ngOnInit() {

			this.mForm = this.formBuilder.group({
					name: ['', Validators.required] 
				});
	  	}
	  	ngAfterContentInit (){
			this.shared.showHideLoader(false);
	  	}
	  async	onAddManufacturer(){
	   
		  		if (this.mForm.invalid) {
					return;
				}
				
				var res=await this.mService.addManufacturer( this.mForm.value);
				 
				if(typeof this.mService.sValidator.status!=undefined && this.mService.sValidator.status==400)
				{
					let control = this.mForm.controls['name'];
					control.setErrors({backend: {someProp: this.mService.sValidator.error.name[0]}});
					this.msg = control.errors['backend'].invalid;
				}
				else
				{	
					alert(res);

				}
	  	}
}
