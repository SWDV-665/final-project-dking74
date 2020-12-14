import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@config';
import { Question } from '@models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getQuestions(limit?: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions?random`, { params: { random: 'true', limit: (limit?.toString() || '10') }});
  }
}
