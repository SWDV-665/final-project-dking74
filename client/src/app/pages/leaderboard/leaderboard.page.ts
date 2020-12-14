import { Component, OnInit } from '@angular/core';
import { Score } from '@models/Score';
import { ScoreService } from '@services/score/score.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  leaderboard: Score[] = [];

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.getLeaderboard();
  }

  getLeaderboard() {
    this.scoreService.getLeaderboard()
      .subscribe(board => this.leaderboard = board);
  }
}
