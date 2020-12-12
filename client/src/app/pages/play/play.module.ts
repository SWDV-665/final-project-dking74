import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { PageComponent } from '@components/page/page.component';
import { HeaderComponent } from '@components/header/header.component';
import { TabsComponent } from '@components/tabs/tabs.component';

import { PlaySoloPage } from './solo/solo.page';
import { PlayPage } from './play.page';
import { PlayPageRoutingModule } from './play-routing.module';

import { AccountMenuComponent} from '@components/account-menu/account-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayPageRoutingModule
  ],
  declarations: [
    AccountMenuComponent,
    PlayPage,
    PageComponent,
    HeaderComponent,
    TabsComponent,
    PlaySoloPage
  ]
})
export class PlayPageModule {}
