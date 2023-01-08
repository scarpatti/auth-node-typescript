import express from 'express';
import {CartController} from '../controllers/CartController';


const cartsRoutes = express.Router();

cartsRoutes.get('/', CartController.index);
cartsRoutes.get('/:id', CartController.show);
cartsRoutes.post('/', CartController.store);
cartsRoutes.put('/:id', CartController.update);

export default cartsRoutes;
