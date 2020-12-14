import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';

import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Question } from '@models/Question';
import { ErrorService } from '@services/error/error.service';
import { LoaderService } from '@services/loader/loader.service';
import { QuestionService } from '@services/question/question.service';
import { ScoreService } from '@services/score/score.service';
import { ToastService } from '@services/toast/toast.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

import { AnswerResults, CustomizableCountdownProperties, SessionData } from '@types';
import { SessionService } from '@services/game-session/session.service';

@Component({
  selector: 'app-play-solo',
  templateUrl: './solo.page.html',
  styleUrls: ['./solo.page.scss'],
})
export class PlaySoloPage implements OnInit {
  questions: Array<Question> = [];
  currentQuestion: Question;
  currentQuestionIndex: number;
  currentResult: "correct" | "wrong" | null = null;
  loaded: boolean = false;
  gameStarted: boolean = false;
  pageText: string = 'Loading...'
  gameBeginTimerProps: CustomizableCountdownProperties = {
    startTime: 3
  };
  questionTimesProps: CustomizableCountdownProperties = {
    startTime: 10,
    radius: 20,
  }
  sliderOptions: object = {
    initialSlide: 0,
    slidesPerView: 1,
    effect: 'flip',
    centeredSlides: true,
    allowSlideNext: false,
    allowSlidePrev: false
  };
  answerSelected: string = '';
  isAnswerSelected: boolean = false;
  isQuestionTimeout: boolean = false;
  answerResults: AnswerResults = {
    right: 0,
    wrong: 0,
    score: 0
  };
  showGameResults: boolean = false;
  reloadSignaler: Subject<boolean> = new Subject<boolean>();

  @ViewChild('slides') slides: IonSlides;

  constructor(
    private questionService: QuestionService,
    private errorService: ErrorService,
    private loadingService: LoaderService,
    private scoreService: ScoreService,
    private alertController: AlertController,
    private toastService: ToastService,
    private sessionService: SessionService,
    private backgroundService: BackgroundMode,
    private router: Router
  ) { }

  async ngOnInit() {
    // const sessionAvailable = await this.sessionService.isConnected();
    // if (sessionAvailable) {
    //   const sessionData = await this.sessionService.getSession();
    //   console.log(sessionData);
    //   this.loadCurrentDataFromSession(sessionData);
    //   this.loaded = true;
    //   console.log(this.loaded);
    //   console.log(!this.gameStarted);
    //   console.log(!this.showGameResults);
    //   console.log('Show countdown? ', this.loaded && !this.gameStarted && !this.showGameResults);
    // } else {
    await this.loadingService.show();
    this.questionService.getQuestions().toPromise()
      .then(questions => {
        this.loaded = true;
        this.loadingService.remove();
        this.questions = questions;
        if (!this.questions.length) {
          throw new Error('No questions available to play at moment.');
        }

        this.currentQuestion = this.questions[0];
        this.currentQuestionIndex = 0;
        this.pageText = 'Game is starting...';

        // Enable running in background while game is in progress
        this.backgroundService.enable();
      })
      .catch(error => {
        console.error('There was an error retrieving questions to play. Original error: ', error);
        this.loadingService.remove();
        this.errorService.generateError();
      });
  }

  play() {
    this.gameStarted = true;
    this.pageText = 'Question 1';

    // We are about to start the game so lets do an initial save
    // so we don't have to start whole process over
    // this.saveCurrentData();
  }

  changeQuestion(newQuestionIndex: number) {
    this.answerSelected = '';
    this.isAnswerSelected = false;
    this.isQuestionTimeout = false;
    this.currentQuestion = this.questions[newQuestionIndex];
    this.currentQuestionIndex = newQuestionIndex;
    this.reloadSignaler.next(true);
    this.slides.lockSwipes(false);
    this.slides.slideNext().then(() => {
      this.pageText = `Question ${newQuestionIndex + 1}`;
      this.slides.lockSwipes(true);
    });
  }

  checkAnswer(chosenAnswer: string, currentQuestion: Question) {
    return chosenAnswer === currentQuestion.correct_answer;
  }

  answerSubmitted(answerChosen: string) {
    this.answerSelected = answerChosen;
    this.isAnswerSelected = true;
    (this.checkAnswer(answerChosen, this.currentQuestion))
      ? this.currentResult = "correct"
      : this.currentResult = "wrong";
  }

  private reviseResults(result: "correct" | "wrong", timeTaken: number, difficulty: number) {
    if (result === 'correct') {
      this.answerResults.right++;
      this.answerResults.score += (100 * difficulty * (this.questionTimesProps.startTime - (this.questionTimesProps.startTime - timeTaken)));
      return;
    }

    this.answerResults.wrong++;
  }

  questionTimeout() {
    this.isQuestionTimeout = true;
    this.currentResult = "wrong";
  }

  questionCompleted(time: number) {
    if (time === null) {
      this.questionTimeout();
    }
    this.reviseResults(this.currentResult, time, this.currentQuestion.difficulty);
    
    if (!this.isGameFinished()) {
      this.submitNewQuestion();
    } else {
      // Stop running in background after game finished
      this.backgroundService.disable();

      // Give a brief second for changes to hit before changing variables
      // to show the correct game result to user.
      setTimeout(() => {
        this.gameStarted = false;
        this.answerSelected = '';
        this.isAnswerSelected = false;
        this.showGameResults = true;
        this.pageText = 'Game Results';
        this.sessionService.clearSession();
      }, 50);
    }
  }

  private isGameFinished() {
    return (this.currentQuestionIndex + 1) === this.questions.length;
  }

  private submitNewQuestion() {
    setTimeout(() => {
      this.changeQuestion(this.currentQuestionIndex + 1);
    }, 1000);
  }

  async submitScore() {
    const controller = await this.alertController.create({
      header: 'Submit Score',
      cssClass: 'add-score-modal',
      backdropDismiss: false,
      inputs: [{
        id: 'name',
        label: 'Name',
        name: 'Name',
        type: 'text',
        placeholder: 'Name to appear on leaderboard...'
      }],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            controller.dismiss();
          }
        },
        {
          text: 'Submit',
          handler: (val) => {
            controller.dismiss(val);
          }
        }
      ]
    });
    controller.present();
    controller.onDidDismiss().then((data) => {
      if (data.data?.values?.Name) {
        this.scoreService.createScore(
          {
            name: data.data?.values?.Name,
            value: this.answerResults.score
          }
        ).subscribe(result => {
          this.toastService.show('Your score has successfully been added to the board!');
          this.router.navigateByUrl('/play');
        });
      }
    });
  }

  getAnswerBindings(answer: string, question: Question) {
    return {
      'success': this.isAnswerSelected && this.checkAnswer(answer, question),
      'error': (
        (this.isQuestionTimeout && this.checkAnswer(answer, question)) || 
        (this.isAnswerSelected && this.answerSelected === answer && !this.checkAnswer(answer, question))
      )
    }
  }

  async saveCurrentData(sessionId?: string) {
    await this.sessionService.storeSession({
      sessionId: sessionId || uuidv4(),
      lastUpdated: Date.now(),
      currentAnswerResults: this.answerResults,
      questions: this.questions,
      currentQuestionIndex: this.currentQuestionIndex,
      currentQuestion: this.currentQuestion,
      pageText: this.pageText,
      gameStarted: this.gameStarted
    });
  }

  async loadCurrentDataFromSession(data: SessionData) {
    this.answerResults = data.currentAnswerResults;
    this.questions = data.questions;
    this.currentQuestionIndex = data.currentQuestionIndex;
    this.currentQuestion = data.currentQuestion;
    this.pageText = data.pageText;
    this.gameStarted = data.gameStarted;
  }
}
