import { GetScoreConditionals } from '../../types';
import ScoreModel, { ScoreDocument } from '../models/Score';

export const getScores = (scoreConditionals: GetScoreConditionals) => {
    const { username } = scoreConditionals;
    
    let query = {};
    if (username) query['name'] = username;
    return ScoreModel.find(query).exec();
}

export const createScore = (score: ScoreDocument) => {
    return ScoreModel.create(score);
}

export default {
    getScores,
    createScore
}