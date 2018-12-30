import { Component, OnInit } from '@angular/core';
 import { SharedService } from '../services/shared/shared.service';
@Component({
  selector: 'image-upload',
  templateUrl: './car-image-upload.component.html',
  styleUrls: ['./car-image-upload.component.scss']
})
export class CarImageUploadComponent implements OnInit {
  urls = new Array<string>();

  constructor( 
  			  public shared: SharedService) { }
  
  ngOnInit() {
  }
   async uploadFile(files   ) {
     this.urls=[];
     this.shared.files=null;
     
    if(files.length>2)
   		{
   			alert("Only two files can be uploaded. Choose only two files again.");
   			return;
   		} 	
    
 	if (files) {
      for (let file of files) {
      	 
      	if(file.size>100000)
   		{	this.urls=[];	
			alert("File size must be under 100kb.Upload Again ")
			return;
		}
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
      	this.shared.files=files;

    }
  }
    
}
