"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = __importDefault(require("../config/database"));
// import { User } from '../models/user-model';
// const connection = new sequelize.Sequelize(config);
// User.init(connection);
// export const connection;
class Database {
    constructor() {
        this.config = database_1.default;
        this.init();
    }
    init() {
        this.connection = new sequelize_1.default.Sequelize(this.config);
    }
}
const database = new Database();
exports.default = database;
//# sourceMappingURL=index.js.map