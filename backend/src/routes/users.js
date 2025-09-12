import express from 'express';
import { listUsers, getUser, updatePassword } from '../controllers/users.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
const router = express.Router();
router.get('/', authenticateToken, authorizeRoles('admin'), listUsers);
router.get('/:id', authenticateToken, authorizeRoles('admin','user','store_owner'), getUser);
router.post('/update-password', authenticateToken, updatePassword);
export default router;