import services from '../services/leaderboard.service';

export const getLeaderBoard = (req, res, next) => {
    const numResults: number = parseInt(req.query.limit || 10);
    services.getLeaderBoard(numResults)
      .then(results => res.status(200).json(results));
}

export default {
    getLeaderBoard
}