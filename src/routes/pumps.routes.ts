import express from 'express';
import {PumpController} from '../controllers/PumpController';


const pumpsRoutes = express.Router();

pumpsRoutes.get('/', PumpController.index);
pumpsRoutes.get('/:id', PumpController.show);
pumpsRoutes.post('/', PumpController.store);
pumpsRoutes.put('/:id', PumpController.update);

export default pumpsRoutes;
