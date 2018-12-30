import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { InventoryData } from '../../model/inventory.model';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {

	constructor(private http: HttpClient,public api:ApiService) { }
	getInventory(  page: number,perPage:number): Observable<InventoryData> {
     	page=isNaN( page)?1:page ;
		perPage=isNaN( perPage)?2:perPage ;
		const url=this.api.url;				 
	    return this.http.get<InventoryData>(url+'/api/inventory?page='+`${page + 1}&perPage=${perPage}`);
	}
	getCarModel(data) {
     	 				 
		return this.api.get('api/car-model?id='+data );
	}
}
