import express from 'express';
import {AuthController} from '../controllers/auth-controller';
// import {AuthMiddleware} from '../middlewares/auth-middleware';

const authRoutes = express.Router();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/authenticate', AuthController.authenticate);
authRoutes.post('/refresh', AuthController.refresh);
// authRoutes.get('/me', AuthMiddleware, AuthController.me);

export default authRoutes;
