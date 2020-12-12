import { Router } from 'express';

import leaderController from '../controllers/leaderboard.controller';

const router = Router();
router.get('/leaderboard', leaderController.getLeaderBoard);

export default router;