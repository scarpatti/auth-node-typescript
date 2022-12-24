import express from 'express';
import {AuthController} from '../controllers/AuthController';

const authRoutes = express.Router();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/authenticate', AuthController.authenticate);
authRoutes.post('/refresh', AuthController.refresh);
authRoutes.post('/logout', AuthController.logout);

export default authRoutes;
