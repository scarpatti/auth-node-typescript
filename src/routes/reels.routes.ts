import express from 'express';
import {ReelController} from '../controllers/ReelController';


const reelsRoutes = express.Router();

reelsRoutes.get('/', ReelController.index);
reelsRoutes.get('/:id', ReelController.show);
reelsRoutes.post('/', ReelController.store);
reelsRoutes.put('/:id', ReelController.update);

export default reelsRoutes;
