import { Injectable ,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loader: EventEmitter<boolean> = new EventEmitter<boolean>();
  url="http://localhost:8000/"
  public files : FileList;
  constructor() { }
  showHideLoader(status:boolean){

  	return this.loader.emit(status); 
  }


}
