import { Document, Schema, model, Model } from 'mongoose';

export interface Score {
  name: String;
  value: Number;
}
export interface ScoreDocument extends Score, Document {}
export interface ScoreModel extends Model<ScoreDocument> {
  getTopScores: (numScores: number) => Promise<ScoreDocument[]>;
};

const ScoreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true,
    validate: (val: number) => val >= 0
  }
});
ScoreSchema.statics.getTopScores = function (numScores: number): Promise<ScoreDocument[]> {
    return this.find({}).sort({ value: -1}).limit(numScores);
}

export default model<ScoreDocument, ScoreModel>('Score', ScoreSchema);