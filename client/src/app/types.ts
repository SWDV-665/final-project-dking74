import { Question } from "@models/Question";
import { ObjectUnsubscribedError } from "rxjs";

export interface AppTabProperties {
  name: string;
  icon: string;
}

export interface CustomizableCountdownProperties {
  startTime: number;
  titleColor?: string;
  titleFontSize?: string
  titleFontWeight?: string;
  radius?: number;
  clockwise?: boolean;
  class?: string;
  backgroundOpacity?: number;
  backgroundColor?: string;
  outerStrokeColor?: string;
  innerStrokeColor?: string;
}

export interface CountdownProperties extends CustomizableCountdownProperties {
  title?: string;
  percent?: number;
  maxPercent?: number;
  startFromZero?: boolean;
  showTitle?: boolean;
  showUnits?: boolean;
  showSubtitle?: boolean;
}

export interface AnswerResults {
  right?: number;
  wrong?: number;
  score?: number;
}

export interface SessionData {
  sessionId?: string;
  lastUpdated: number;
  currentAnswerResults: AnswerResults;
  questions: Question[];
  currentQuestionIndex: number;
  currentQuestion: Question;
  pageText: string;
  gameStarted: boolean;
}