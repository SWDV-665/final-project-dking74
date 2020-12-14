import { Injectable } from '@angular/core';

import { StorageService } from '@services/storage/storage.service';
import { SessionData } from '@types';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private storage: StorageService) { }

  async isConnected() {
    return await this.storage.get('sessionId')
      .then(connected => connected !== null)
      .catch(error => false);
  }

  async storeSession(data: SessionData) {
    return await Promise.all([
      this.storage.set('sessionId', data.sessionId),
      this.storage.set('lastUpdated', data.lastUpdated),
      this.storage.set('currentAnswerResults', data.currentAnswerResults),
      this.storage.set('questions', data.questions),
      this.storage.set('currentQuestionIndex', data.currentQuestionIndex),
      this.storage.set('currentQuestion', data.currentQuestion),
      this.storage.set('pageText', data.pageText),
      this.storage.set('gameStarted', data.gameStarted)
    ]);
  }

  async getSession(): Promise<SessionData> {
    const sessionData = await Promise.all([
      this.storage.get('sessionId'),
      this.storage.get('lastUpdated'),
      this.storage.get('currentAnswerResults'),
      this.storage.get('questions'),
      this.storage.get('currentQuestionIndex'),
      this.storage.get('currentQuestion'),
      this.storage.get('pageText'),
      this.storage.get('gameStarted')
    ]);

    return {
      sessionId: sessionData[0],
      lastUpdated: sessionData[1],
      currentAnswerResults: sessionData[2],
      questions: sessionData[3],
      currentQuestionIndex: sessionData[4],
      currentQuestion: sessionData[5],
      pageText: sessionData[6],
      gameStarted: sessionData[7]
    };
  }

  async clearSession() {
    await this.storage.clear();
  }
}
