import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaderboardPageRoutingModule } from './leaderboard-routing.module';

import { LeaderboardPage } from './leaderboard.page';
import { SharedModule } from '@components/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LeaderboardPageRoutingModule
  ],
  declarations: [
    LeaderboardPage
  ]
})
export class LeaderboardPageModule {}
