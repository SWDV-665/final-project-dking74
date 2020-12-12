import { Router } from 'express';
import routes from './routes';

const router = Router();
router.use(routes.GroceriesRoutes);
router.use(routes.LeaderboardRoutes);
router.use(routes.ScoresRoutes);
router.use(routes.UsersRoutes);

export default router;