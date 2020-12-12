import { Component } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: 'play.page.html',
  styleUrls: ['play.page.scss'],
})
export class PlayPage {
  backgroundImage: string = '/assets/home-images/michael-scott-best-boss-ever.jpg';

  constructor() {}

  get backgroundStyle(): object {
    return {
      background: `url('${this.backgroundImage}') no-repeat center center / cover`,
    };
  }
}
