import express from "express";
import { privateRoutes, publicRoutes } from './routes';
import cors from 'cors';
import HandlerException from "./exceptions/Handler.exception";
import { Paginator } from "./middleware/Paginator";
import { AuthMiddleware } from "./middleware/AuthMiddleware";

const app = express();

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:4000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true
};

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());

app.use(Paginator.handler);

app.use('/api/v1', publicRoutes);
app.use('/api/v1', AuthMiddleware, privateRoutes);

app.use(HandlerException.report);

app.listen(3333);
