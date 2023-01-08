import express from 'express';
import authRoutes from './auth.routes';
import cartsRoutes from './carts.routes';
import groupsRoutes from './groups.routes';
import plotsRoutes from './plots.routes';
import pumpsRoutes from './pumps.routes';
import reelsRoutes from './reels.routes';
import rolesRoutes from './roles.routes';
import sectionsRoutes from './sections.routes';
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
privateRoutes.use('/sections', sectionsRoutes);
privateRoutes.use('/pumps', pumpsRoutes);
privateRoutes.use('/reels', reelsRoutes);
privateRoutes.use('/carts', cartsRoutes);
privateRoutes.use('/groups', groupsRoutes);
