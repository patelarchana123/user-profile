import { Component } from '@angular/core';
import { LoaderService } from './core/services/loader/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'desk-book';
  result : any;
  loader: boolean;
  constructor(  
    private loaderService: LoaderService){
    this.loader = false;
   
  }

  ngOnInit(): void {

    this.loaderService.status.subscribe((res) => { 
      this.loader = res;
    });
}
}
