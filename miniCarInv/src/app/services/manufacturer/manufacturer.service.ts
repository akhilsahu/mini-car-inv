import { ApiService } from '../api/api.service';
import { Injectable } from '@angular/core';
import { SharedService} from '../shared/shared.service';
@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  public sValidator:any;
  public manufacturersList:any;
  constructor(public api: ApiService,public shared:SharedService ) { }
  
  getManufacturer()
  { 
    this.shared.showHideLoader(true); 
  	this.api.get('api/manufacturer').subscribe(
  				(data)=>{
  					this.manufacturersList=data;
            this.shared.showHideLoader(false); 
  					console.log(data)}, 
  				(err) =>{
            this.shared.showHideLoader(false); 

            console.log(err);  } ) ;  
  }
  addManufacturer(data:any)
  {
    this.sValidator=[];
  	this.shared.showHideLoader(true); 
  	return  this.api.post('api/manufacturer',data)
                    .toPromise()
                    .then((data)=>{this.shared.showHideLoader(false);
                        return data
                    }, 
                          (err) => {  
                                    this.sValidator =err; 
                                      this.shared.showHideLoader(false);
                                      return err;
                  })
    }
}
