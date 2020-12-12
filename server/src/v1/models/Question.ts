import { Document, Schema, model } from 'mongoose';

export interface Question {
  text: String,
  possible_answers: [String],
  correct_answer: String,
  difficulty: Number
}
export interface QuestionDocument extends Question, Document {}

const QuestionSchema = new Schema({
  text: {
    type: String,
    required: true,
    index: { unique: true, sparse: true }
  },
  possible_answers: {
    type: [String],
    required: true
  },
  correct_answer: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    default: 3,
    enum: [ 1, 2, 3 ]
  }
});

export default model('Question', QuestionSchema);