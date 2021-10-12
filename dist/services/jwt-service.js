"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
if (!auth_1.default.JWT_KEY || !auth_1.default.JWT_EXPIRED)
    throw new Error('JWT_KEY or JWT_EXPIRED not found!');
class JwtService {
}
exports.JwtService = JwtService;
JwtService.generateToken = (payload, expiresIn) => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.sign(payload, auth_1.default.JWT_KEY, {
        expiresIn: expiresIn
    }, (erorr, token) => {
        if (erorr) {
            reject(erorr);
        }
        else {
            resolve(token);
        }
    });
});
//# sourceMappingURL=jwt-service.js.map