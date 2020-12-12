import { ServerErrorResponse } from '../../exceptions';
import { ScoreDocument } from '../models/Score';
import services from '../services/scores.service';

export const getScores = (req, res, next) => {
    const username = req.query.username;
    services.getScores({ username })
      .then(scores => res.status(200).json(scores))
      .catch(error => next(new ServerErrorResponse(error)))
};

export const createScore = (req, res, next) => {
    const score: ScoreDocument = req.body;
    services.createScore(score)
      .then(score => res.status(201).json(score))
      .catch(error => next(new ServerErrorResponse(error)));
}

export default {
    getScores,
    createScore
}