import express from 'express';
import {UserController} from '../controllers/UserController';


const usersRoutes = express.Router();

usersRoutes.get('/', UserController.index);
usersRoutes.get('/profile', UserController.profile);
usersRoutes.get('/:id', UserController.show);
usersRoutes.post('/', UserController.store);
usersRoutes.put('/:id', UserController.update);

export default usersRoutes;
