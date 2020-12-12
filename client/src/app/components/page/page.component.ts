import { Component, Input, OnInit } from '@angular/core';

import { AppTabProperties } from '@types';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  @Input() tabs: AppTabProperties[] = [
    {
      name: 'play',
      icon: 'play'
    },
    {
      name: 'leader-board',
      icon: 'clipboard'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
