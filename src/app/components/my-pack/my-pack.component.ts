import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {UserService} from '../../core/user/service/user.service';
import {MyPackService} from './service/my-pack.service';
import {ConfigService} from "../../services/config/config.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-my-pack',
  templateUrl: './my-pack.component.html',
  styleUrls: ['./my-pack.component.scss']
})
export class MyPackComponent implements OnInit {

  public dogs: any;

  public page = 0;
  public sizeOfPage = 12;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private myPackApi: MyPackService,
    private config: ConfigService,
    private router: Router) { }

   async ngOnInit(): Promise<void> {
    try{
     this.dogs = await this.myPackApi.myPackView();
    }
    catch (error){
    }
   }

   createDogProfile(): void{
     this.config.canCreateDogProfile = true;
     this.router.navigate(['create-dog-profile', 'dog-step-one']);
   }

}
