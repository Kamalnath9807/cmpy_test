import express from 'express';
import * as adminController from '../controllers/adminData.controller.js';
import authenticateToken from '../middleware/middleware.js';

const router = express.Router();

router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/get-posts', authenticateToken, adminController.getAdminPosts);

export default router;
