import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    effect: 'slide',
    speed: 3,
    loop: true,
    autoplay: true
  };

  slideImages: Array<string> = [
    'the-office-cast.jpg'
  ];

  constructor() {}

}
