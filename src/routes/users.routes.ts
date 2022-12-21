import express from 'express';
import {UserController} from '../controllers/UserController';
import {AuthMiddleware} from '../middlewares/AuthMiddleware';


const usersRoutes = express.Router();

usersRoutes.use(AuthMiddleware);

usersRoutes.get('/', UserController.index);
usersRoutes.get('/:id');
usersRoutes.post('/', UserController.store);

export default usersRoutes;
