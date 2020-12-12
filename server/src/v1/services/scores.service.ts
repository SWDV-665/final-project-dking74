import { GetScoreConditionals } from '../../types';
import ScoreModel, { ScoreDocument } from '../models/Score';

export const getScores = (scoreConditionals: GetScoreConditionals) => {
    const { username } = scoreConditionals;
    return ScoreModel.find({ name: username}).exec();
}

export const createScore = (score: ScoreDocument) => {
    return ScoreModel.create(score);
}

export default {
    getScores,
    createScore
}