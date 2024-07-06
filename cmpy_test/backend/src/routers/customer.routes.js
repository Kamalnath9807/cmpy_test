import express from 'express';
import * as customerController from '../controllers/customerData.controller.js';
import authenticateToken from '../middleware/middleware.js';

const router = express.Router();

router.post('/post', authenticateToken, customerController.createCustomerPost);

router.get('/posts', authenticateToken, customerController.getCustomerPosts);
router.post('/login', authenticateToken, customerController.login);

export default router;
