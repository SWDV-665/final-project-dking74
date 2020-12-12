import ScoreModel from '../models/Score';

export const getLeaderBoard = (numScores: number = 20) => {
    return ScoreModel.getTopScores(numScores);
};

export default {
    getLeaderBoard
}