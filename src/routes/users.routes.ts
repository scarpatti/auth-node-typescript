import express from 'express';
// import usersService from '../services/usersService';
import {UserController} from '../controllers/user-controller';
import {AuthMiddleware} from '../middlewares/auth-middleware';


const usersRoutes = express.Router();

usersRoutes.use(AuthMiddleware);

usersRoutes.get('/', UserController.index);
usersRoutes.get('/:id');
usersRoutes.post('/', UserController.store);

export default usersRoutes;
