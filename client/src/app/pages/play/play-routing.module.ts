import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayPage } from './play.page';
import { PlaySoloPage } from './solo/solo.page';

const routes: Routes = [
  {
    path: '',
    component: PlayPage,
  },
  {
    path: 'solo',
    component: PlaySoloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayPageRoutingModule {}
