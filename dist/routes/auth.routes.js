"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth-controller");
// import {AuthMiddleware} from '../middlewares/auth-middleware';
const authRoutes = express_1.default.Router();
authRoutes.post('/register', auth_controller_1.AuthController.register);
// authRoutes.post('/authenticate', AuthController.authenticate);
// authRoutes.post('/refresh', AuthController.refresh);
// authRoutes.get('/me', AuthMiddleware, AuthController.me);
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map