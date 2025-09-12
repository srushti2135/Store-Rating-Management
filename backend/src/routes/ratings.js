import express from 'express';
import { submitRating, listRatings } from '../controllers/ratings.js';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();
router.post('/', authenticateToken, submitRating);
router.get('/', authenticateToken, listRatings);
export default router;