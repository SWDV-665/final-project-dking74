import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {}

  closeMenu() {
    this.menuCtrl.close();
  }
}
