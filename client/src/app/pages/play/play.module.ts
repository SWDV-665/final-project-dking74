import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PlaySoloPage } from './solo/solo.page';
import { PlayPage } from './play.page';
import { PlayPageRoutingModule } from './play-routing.module';

import { SharedModule } from '@components/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    PlayPageRoutingModule,
  ],
  declarations: [
    PlayPage,
    PlaySoloPage
  ]
})
export class PlayPageModule {}
