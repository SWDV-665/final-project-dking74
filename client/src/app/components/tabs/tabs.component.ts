import { Component, Input, OnInit } from '@angular/core';

import { AppTabProperties } from '@types';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() location: string = "bottom";
  @Input() tabs: AppTabProperties[] = [];

  constructor() { }

  ngOnInit() {}

}
