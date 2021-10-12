"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import usersService from '../services/usersService';
const user_controller_1 = require("../controllers/user-controller");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const usersRoutes = express_1.default.Router();
usersRoutes.use(auth_middleware_1.AuthMiddleware);
usersRoutes.get('/', user_controller_1.UserController.index);
usersRoutes.get('/:id');
usersRoutes.post('/', user_controller_1.UserController.store);
exports.default = usersRoutes;
//# sourceMappingURL=users.routes.js.map