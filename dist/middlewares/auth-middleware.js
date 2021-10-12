"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader)
            return res.status(401).json({ error: 'No token provided' });
        const parts = authHeader.split(' ');
        if (parts.length === 2) {
            const [scheme, token] = parts;
            if (!/^Bearer$/i.test(scheme))
                return res.status(401).json({ error: 'Token malformated' });
            jsonwebtoken_1.default.verify(token, auth_1.default.JWT_KEY, (error, decoded) => {
                if (error)
                    return res.status(401).json({ error: 'Invalid Token' });
                req.userId = decoded.id;
                next();
            });
        }
        else {
            return res.status(401).json({ error: 'Token error' });
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
});
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth-middleware.js.map