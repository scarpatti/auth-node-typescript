import express from "express";
import { mainRoutes } from './routes';

const app = express();

require('./database/index');

app.use(express.json());

app.use('/api/v1', mainRoutes);

app.listen(3000);
