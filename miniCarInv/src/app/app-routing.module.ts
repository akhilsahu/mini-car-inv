import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddManufacturerComponent }      from './add-manufacturer/add-manufacturer.component';
import { AddModelComponent }      from './add-model/add-model.component';
import { InventoryComponent } from './inventory/inventory.component';
 
const routes: Routes = [ 
		{ path: 'add-manufacturers', component: AddManufacturerComponent },
		{ path: 'add-model', component: AddModelComponent },
		{ path: 'view-inventory', component: InventoryComponent},
		{ path: '', component: InventoryComponent} 
 						];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
