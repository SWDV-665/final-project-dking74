import mongoose from 'mongoose';

import QuestionModel, { Question, QuestionDocument } from '../models/Question';
// import { GetQuestionConditionals } from '@types';
import { GetQuestionConditionals } from '../../types';

export async function getAllQuestions(conditionals: GetQuestionConditionals) {
  return QuestionModel.find(conditionals).exec();
}

export function getQuestionItem(id: string) {
  return QuestionModel.findById(mongoose.Types.ObjectId(id)).exec();
}

export async function createQuestionItem(question: QuestionDocument) {
  return QuestionModel.create(question);
}

export async function createMultipleQuestionItems(groceries: Array<QuestionDocument>) {
  return QuestionModel.insertMany(groceries);
}

export async function updateQuestionItem(id: string, grocery: Question) {
  return QuestionModel.updateOne({ _id: mongoose.Types.ObjectId(id) }, grocery).exec();
}

export function deleteQuestionItem(id: string) {
  return QuestionModel.deleteOne({ _id: mongoose.Types.ObjectId(id) }).exec();
}

export default {
  getAllQuestions,
  getQuestionItem,
  createQuestionItem,
  createMultipleQuestionItems,
  updateQuestionItem,
  deleteQuestionItem
}