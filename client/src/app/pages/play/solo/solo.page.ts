import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';

import { Question } from '@models/Question';
import { ErrorService } from '@services/error/error.service';
import { LoaderService } from '@services/loader/loader.service';
import { QuestionService } from '@services/question/question.service';
import { ScoreService } from '@services/score/score.service';
import { ToastService } from '@services/toast/toast.service';
import { AnswerResults, CustomizableCountdownProperties } from '@types';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-play-solo',
  templateUrl: './solo.page.html',
  styleUrls: ['./solo.page.scss'],
})
export class PlaySoloPage implements OnInit {
  questions: Array<Question> = [];
  currentQuestion: Question;
  currentQuestionIndex: number;
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
  stopTimerSignaler: Subject<boolean> = new Subject<boolean>();

  @ViewChild('slides') slides: IonSlides;

  constructor(
    private questionService: QuestionService,
    private errorService: ErrorService,
    private loadingService: LoaderService,
    private scoreService: ScoreService,
    private alertController: AlertController,
    private toastService: ToastService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadingService.show();

    this.getQuestionsForPlay()
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
      })
      .catch(error => {
        console.error('There was an error retrieving questions to play. Original error: ', error);
        this.loadingService.remove();
        this.errorService.generateError();
      });
  }

  private async getQuestionsForPlay() {
    return this.questionService.getQuestions().toPromise();
  }

  play() {
    this.gameStarted = true;
    this.pageText = 'Question 1';
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
    this.stopTimerSignaler.next(true);
    this.answerSelected = answerChosen;
    this.isAnswerSelected = true;
    if (this.checkAnswer(answerChosen, this.currentQuestion)) {
      this.answerResults.right++;
    } else {
      this.answerResults.wrong++;
    }

    this.submitNewQuestion();
  }

  questionTimeout() {
    this.isQuestionTimeout = true;
    this.answerResults.wrong++;
    this.submitNewQuestion();
  }

  private isGameFinished() {
    return (this.currentQuestionIndex + 1) === this.questions.length;
  }

  private submitNewQuestion() {
    if (!this.isGameFinished()) {
      setTimeout(() => {
        this.changeQuestion(this.currentQuestionIndex + 1);
      }, 1000);
    } else {
      this.gameStarted = false;
      this.showGameResults = true;
      this.pageText = 'Game Results';
    }
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
}
