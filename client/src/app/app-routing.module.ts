import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'play',
    loadChildren: './pages/play/play.module#PlayPageModule'
  },
  {
    path: 'leaderboard',
    loadChildren: './pages/leaderboard/leaderboard.module#LeaderboardPageModule'
  },
  {
    path: '',
    redirectTo: '/play',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
