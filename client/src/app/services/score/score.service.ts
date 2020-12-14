import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@config';
import { Score } from '@models/Score';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createScore(score: Score): Observable<Score> {
    return this.http.post<Score>(`${this.apiUrl}/scores`, score);
  }

  getLeaderboard(): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.apiUrl}/leaderboard`);
  }
}
