import {HttpClient} from '@angular/common/http';
import {Component, Inject,OnInit, ViewChild ,EventEmitter,Output,TemplateRef} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {InventoryService} from '../services/inventory/inventory.service';
import { CarModelService} from '../services/carModel/car-model.service';;
import { InventoryItem } from '../model/inventory.model';
 import {DOCUMENT} from '@angular/common';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SharedService} from '../services/shared/shared.service';
export interface CarDetailsData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers:[InventoryService,CarModelService]
})
export class InventoryComponent implements OnInit {
 
   displayedColumns: string[] = ['number','manufacturer_name', 'model_name',  'count'];
  
  //inventoryService: InventoryService | null;
	data: InventoryItem[] = [];
 
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  srno=0; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient
			  ,private inventoryService :InventoryService
  			,public dialog: MatDialog
  			,public carModel:CarModelService
        ,public shared: SharedService) {}

  ngOnInit() {

  	 
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
         
		this.isLoadingResults = true;
		this.srno=this.paginator.pageIndex*this.paginator.pageSize;
         
		this.srno=( isNaN(this.srno))?0:this.srno;	
          	

		return this.inventoryService!.getInventory( this.paginator.pageIndex,  this.paginator.pageSize);
        }),
        map(data => {
           
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
         
			this.resultsLength = data.total;

			return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
           
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
  ngAfterContentInit (){
      this.shared.showHideLoader(false);
  }


	showModal(tData): void {
    this.shared.showHideLoader(true);  
   
    
    if(typeof tData.id != undefined)   
    this.inventoryService.getCarModel(tData.id).subscribe(
            (iData)=>{  
                 this.shared.showHideLoader(false);
                let data ={tData:{},iData:{}};  
                    data.tData=tData;
                    data.iData=iData
                    this.openModal(data);
                
                }, 
            (err) => { 
               console.log(err);
               //alert("Some Error Occured");
              /* if(err.status!=404)
                alert("Some Error");   */
              this.shared.showHideLoader(false);

        } )
		
  }
  openModal(data ){
    console.log(data);
        const dialogRef = this.dialog.open(CarDetailsModal, {
            width: '550px',
            data:data 
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');

            this.deleteCarModel(result) ;
           
          });
  }
   deleteCarModel(res){
    this.shared.showHideLoader(true);
      this.carModel.deleteCarModel(res).subscribe(
            (data)=>{ 
                  if(data)
                  {  
                    this.shared.showHideLoader(false);
                    alert("Success Sold"); 
                    this.ngOnInit();


                  }
                }, 
            (err) => { 
               console.log(err);
              // alert("Some Error Occured");
                   this.shared.showHideLoader(false);

        });
   }
}
  
 @Component({ 
 	selector: 'modal-dialog',
	templateUrl: './car-detail.html',
	styleUrls: ['./inventory.component.scss']
})
export class CarDetailsModal {

  constructor(
    public dialogRef: MatDialogRef<CarDetailsModal>,
    @Inject(MAT_DIALOG_DATA) public data: CarDetailsData ,public shared: SharedService) {}

		onNoClick(): void {
		    this.dialogRef.close();
		  }

}
 