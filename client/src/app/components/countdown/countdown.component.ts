import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CountdownProperties, CustomizableCountdownProperties } from '@types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  @Input() reloader: Observable<boolean> = new Observable<boolean>();
  @Input() stopTimer: Observable<boolean> = new Observable<boolean>();
  @Input() props: CustomizableCountdownProperties;
  @Input() set running(value: boolean) {
    if (value && this.currentInterval) {
      clearInterval(this.currentInterval);
      this.done.emit(this.currentTime);
    }
  }
  @Output() done: EventEmitter<any> = new EventEmitter();

  defaultProperties: CountdownProperties = {
    radius: 100,
    clockwise: false,
    startFromZero: false,
    showTitle: true,
    showUnits: false,
    showSubtitle: false,
    startTime: 10,
    titleColor: 'navy', 
    titleFontSize: '24px',
    titleFontWeight: '400',
    class: '',
    percent: 0,
    maxPercent: 100,
    backgroundOpacity: 1,
    outerStrokeColor: '#1962f5',
    innerStrokeColor: '#ced2d9'
  };
  properties: CountdownProperties;
  currentTime: number;
  currentInterval: any;

  constructor() {}

  ngOnInit() {
    this.properties = Object.assign({}, this.defaultProperties, this.props);
    this.initialize();

    this.reloader.subscribe((value) => {
      if (value) this.initialize();
    });
    // this.stopTimer.subscribe((value) => {
    //   if (value) clearInterval(this.currentInterval);
    // });
  }

  initialize() {
    this.currentTime = this.properties.startTime;
    this.setChangingProperties();
    this.startTimer();
  }

  startTimer() {
    this.currentInterval = setInterval(() => {
      this.currentTime--;
      if (this.currentTime < 0) {
        clearInterval(this.currentInterval);
        this.done.emit(null);
        return;
      }

      this.setChangingProperties();
    }, 1000);
  }

  setChangingProperties() {
    this.properties.title = this.currentTime.toString();
    this.properties.percent = ((this.properties.startTime - (this.properties.startTime - this.currentTime)) / this.properties.startTime) * 100;
  }
}
