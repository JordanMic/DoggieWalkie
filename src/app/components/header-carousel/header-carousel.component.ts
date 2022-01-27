import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-carousel',
  templateUrl: './header-carousel.component.html',
  styleUrls: ['./header-carousel.component.scss']
})
export class HeaderCarouselComponent implements OnInit {

    images = ['./assets/img/Slider1.jpg', './assets/img/Slider2.jpg'];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToDogListPage(): void{
    this.router.navigate(['dog-list']);
  }
}
