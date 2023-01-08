  import express from 'express';
import {GroupController} from '../controllers/GroupController';


const groupsRoutes = express.Router();

groupsRoutes.get('/', GroupController.index);
groupsRoutes.get('/:id', GroupController.show);
groupsRoutes.post('/', GroupController.store);
groupsRoutes.put('/:id', GroupController.update);

export default groupsRoutes;
