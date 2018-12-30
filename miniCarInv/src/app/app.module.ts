import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/*services*/
import { ApiService } from './services/api/api.service';
import { SharedService} from './services/shared/shared.service';
/*services*/

/*Mat List*/

import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

/*Mat List*/
//Components
import { AddModelComponent } from './add-model/add-model.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AddManufacturerComponent } from './add-manufacturer/add-manufacturer.component';
import { InventoryComponent,CarDetailsModal } from './inventory/inventory.component';
import { LoaderComponent } from './loader/loader.component';
//Componenets   

/*File Upload*/
import { NgxfUploaderModule } from 'ngxf-uploader';
import { CarImageUploadComponent } from './car-image-upload/car-image-upload.component';
/*File Upload*/



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AddManufacturerComponent,
    AddModelComponent,
    InventoryComponent,
    CarDetailsModal,
     LoaderComponent,
     CarImageUploadComponent
     
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
	BrowserAnimationsModule,
	MatGridListModule,
	MatToolbarModule,
	MatMenuModule,
	MatTabsModule,
	MatButtonModule,
	ReactiveFormsModule,
	MatInputModule,
	MatCardModule,
	MatDividerModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatChipsModule,
  MatListModule,
  MatIconModule,
  HttpClientModule,

  NgxfUploaderModule
  ],
  providers: [ApiService,SharedService],
  bootstrap: [AppComponent],
  entryComponents: [  CarDetailsModal],
})
export class AppModule { }
