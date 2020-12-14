import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaderboardPageRoutingModule } from './leaderboard-routing.module';

import { LeaderboardPage } from './leaderboard.page';
import { PageComponent } from '@components/page/page.component';
import { AccountMenuComponent } from '@components/account-menu/account-menu.component';
import { HeaderComponent } from '@components/header/header.component';
import { TabsComponent } from '@components/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaderboardPageRoutingModule
  ],
  declarations: [
    LeaderboardPage,
    PageComponent,
    AccountMenuComponent,
    PageComponent,
    HeaderComponent,
    TabsComponent,
  ]
})
export class LeaderboardPageModule {}
