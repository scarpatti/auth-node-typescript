import express from 'express';
import {RoleController} from '../controllers/RoleController';
import {AuthMiddleware} from '../middleware/AuthMiddleware';


const rolesRoutes = express.Router();

rolesRoutes.use(AuthMiddleware);

rolesRoutes.get('/', RoleController.index);

export default rolesRoutes;
