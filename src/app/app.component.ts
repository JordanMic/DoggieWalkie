import { ApiService } from './services/api/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private api: ApiService){

  }

  gog(){
    this.api;
  }
}
