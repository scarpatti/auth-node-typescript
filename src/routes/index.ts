import express from 'express';
import authRoutes from './auth.routes';
import plotsRoutes from './plots.routes';
import rolesRoutes from './roles.routes';
import usersRoutes from './users.routes';
import zonesRoutes from './zones.routes';

export const publicRoutes = express.Router();
export const privateRoutes = express.Router();

// Public Routes
publicRoutes.use('/auth', authRoutes);

// Private Routes
privateRoutes.use('/users', usersRoutes);
privateRoutes.use('/roles', rolesRoutes);
privateRoutes.use('/plots', plotsRoutes);
privateRoutes.use('/zones', zonesRoutes);
