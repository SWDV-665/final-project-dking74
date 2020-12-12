import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  collapsedProp: "condense" | undefined = undefined;
  @Input() collapsible: Boolean = false;
  @Input() backButtonEnabled: Boolean = false;

  constructor() {}

  ngOnInit() {
    this.collapsedProp = (this.collapsible) ? "condense" : undefined;
  }
}
