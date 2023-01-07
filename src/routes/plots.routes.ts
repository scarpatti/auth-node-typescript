import express from 'express';
import {PlotController} from '../controllers/PlotController';


const plotsRoutes = express.Router();

plotsRoutes.get('/', PlotController.index);
plotsRoutes.get('/:id', PlotController.show);
plotsRoutes.post('/', PlotController.store);
plotsRoutes.put('/:id', PlotController.update);

export default plotsRoutes;
