import { Router } from 'express';

import uController from '../controllers/users.controller';

const router = Router();
router.get('/users/:id', uController.getUser);
router.post('/users', uController.createUser);
router.patch('/users/:id', uController.updateUser);
router.patch('/users/:id/score', uController.updateUserScore);
router.patch('/users/:id/wins', uController.updateUserWins);
router.patch('/users/:id/losses', uController.updateUserLosses);
router.delete('/users/:id', uController.deleteUser);

export default router;