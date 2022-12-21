import express from "express";
import appConfig from "./config/app";
import { mainRoutes } from './routes';

const app = express();

app.use(express.json());

app.use('/api/v1', mainRoutes);

app.listen(appConfig.port);
