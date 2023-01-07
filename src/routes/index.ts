import express from 'express';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import authRoutes from './auth.routes';
import plotsRoutes from './plots.routes';
import rolesRoutes from './roles.routes';
import usersRoutes from './users.routes';

export const publicRoutes = express.Router();
export const privateRoutes = express.Router();

// Public Routes
publicRoutes.use('/auth', authRoutes);

// Private Routes
privateRoutes.use('/users', usersRoutes);
privateRoutes.use('/roles', rolesRoutes);
privateRoutes.use('/plots', plotsRoutes);
