import express from 'express';

import qControler from '../controllers/questions.controller';

const router = express.Router();
router.get('/questions', qControler.getAllQuestions);
router.get('/questions/:id', qControler.getQuestion);
router.post('/questions', qControler.createQuestion);
router.post('/questions/bulk', qControler.bulkCreateQuestions);
router.put('/questions/:id', qControler.updateQuestion);
router.delete('/questions/:id', qControler.deleteQuestion);

export default router;