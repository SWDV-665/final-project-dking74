import { Router } from 'express';

import sController from '../controllers/scores.controller';

const router = Router();
router.get('/scores', sController.getScores);
router.post('/scores', sController.createScore);

export default router;