import { Request, Response } from 'express';

import { NotFoundErrorResponse, ServerErrorResponse } from '../../exceptions';
import { GetQuestionConditionals } from '../../types';
import { Question, QuestionDocument } from '../models/Question';
import services from '../services/questions.service';

export function getAllQuestions(req, res, next) {
  const conditionals: GetQuestionConditionals = req.query;
  services.getAllQuestions(conditionals)
    .then(questions => res.status(200).json(questions))
    .catch(error => next(new ServerErrorResponse(error)));
}

export function getQuestion(req: Request, res: Response, next) {
  const questionItemId = req.params.id;
  services.getQuestionItem(questionItemId)
    .then(questionItem => {
      if (questionItem === null) {
        return next(new NotFoundErrorResponse());
      }
      res.status(200).json(questionItem);
    })
    .catch(error => next(new ServerErrorResponse(error)));
}

export function createQuestion(req: Request, res: Response, next) {
  const question: QuestionDocument = req.body;
  services.createQuestionItem(question)
    .then(question => res.status(201).json(question))
    .catch(error => next(new ServerErrorResponse(error)));
}

export function bulkCreateQuestions(req: Request, res: Response, next) {
  const questions: Array<QuestionDocument> = req.body;
  services.createMultipleQuestionItems(questions)
    .then(questions => res.status(201).json(questions))
    .catch(error => next(new ServerErrorResponse(error)));
}

export function updateQuestion(req: Request, res: Response, next) {
  const questionItemId: string = req.params.id;
  const questionUpdate: Question = req.body;
  services.updateQuestionItem(questionItemId, questionUpdate)
    .then(question => res.status(200).json(question))
    .catch(error => next(new ServerErrorResponse(error)));
}

export function deleteQuestion(req: Request, res: Response, next) {
  const questionItemId: string = req.params.id;
  services.deleteQuestionItem(questionItemId)
    .then(question => res.status(200).json(question))
    .catch(error => next(new ServerErrorResponse(error)));
}

export default {
  getAllQuestions,
  getQuestion,
  createQuestion,
  bulkCreateQuestions,
  updateQuestion,
  deleteQuestion,
}