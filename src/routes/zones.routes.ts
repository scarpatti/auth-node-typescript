import express from 'express';
import {ZoneController} from '../controllers/ZoneController';


const zonesRoutes = express.Router();

zonesRoutes.get('/', ZoneController.index);
zonesRoutes.get('/:id', ZoneController.show);
zonesRoutes.post('/', ZoneController.store);
zonesRoutes.put('/:id', ZoneController.update);

export default zonesRoutes;
