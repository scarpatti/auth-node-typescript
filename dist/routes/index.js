"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
exports.mainRoutes = express_1.default.Router();
exports.mainRoutes.use('/auth', auth_routes_1.default);
exports.mainRoutes.use('/users', users_routes_1.default);
//# sourceMappingURL=index.js.map