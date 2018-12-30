import { Component, OnInit ,Input,ChangeDetectorRef } from '@angular/core';
import { SharedService} from '../services/shared/shared.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input('show') show = false;		
  constructor(private cdRef:ChangeDetectorRef,public shared:SharedService) {
  	this.shared.loader.subscribe(isLoading => {
       this.show = isLoading
       this.cdRef.detectChanges();
    });;
   }

  ngOnInit() {   
  }
  ngAfterViewInit(){ 
}

}
