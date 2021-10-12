import express from 'express';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';

export const mainRoutes = express.Router();

mainRoutes.use('/auth', authRoutes);
mainRoutes.use('/users', usersRoutes);
