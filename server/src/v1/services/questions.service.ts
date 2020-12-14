import mongoose from 'mongoose';

import QuestionModel, { Question, QuestionDocument } from '../models/Question';
import { GetQuestionConditionals } from '../../types';

export async function getAllQuestions(conditionals?: GetQuestionConditionals) {
  const { random, limit, ...fieldConditionals } = conditionals || {};
  if (random) {
    if (!limit) {
      console.warn('Random questions were generated with no limit. Default of 10 was used.');
    }
    return getRandomQuestions(limit || 10);
  }

  const query = Object.keys(fieldConditionals).reduce((prev, curr) => {
    if (curr === 'difficulty' || curr === 'text')
      prev[curr] = fieldConditionals[curr];
    return prev;
  }, {});
  return QuestionModel.find(query).exec();
}

export function getRandomQuestions(limit: number): Promise<Question[]> {
  return QuestionModel.aggregate([
    { $sample: { size: limit } }
  ], (err, docs: Question[]) => {
    if (err) Promise.reject(err);

    return docs;
  });
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
  getRandomQuestions,
  getQuestionItem,
  createQuestionItem,
  createMultipleQuestionItems,
  updateQuestionItem,
  deleteQuestionItem
}