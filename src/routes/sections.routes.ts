import express from 'express';
import {SectionController} from '../controllers/SectionController';


const sectionsRoutes = express.Router();

sectionsRoutes.get('/', SectionController.index);
sectionsRoutes.get('/:id', SectionController.show);
sectionsRoutes.post('/', SectionController.store);
sectionsRoutes.put('/:id', SectionController.update);

export default sectionsRoutes;
