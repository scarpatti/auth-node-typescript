"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
require('./database/index');
app.use(express_1.default.json());
app.use('/api/v1', routes_1.mainRoutes);
app.listen(3000);
//# sourceMappingURL=server.js.map