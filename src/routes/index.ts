import express from 'express';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import authRoutes from './auth.routes';
import rolesRoutes from './roles.routes';
import usersRoutes from './users.routes';

export const publicRoutes = express.Router();
export const privateRoutes = express.Router();

publicRoutes.use('/auth', authRoutes);
privateRoutes.use('/users', usersRoutes);
privateRoutes.use('/roles', rolesRoutes);
