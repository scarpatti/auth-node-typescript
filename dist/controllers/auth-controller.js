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
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user-model"));
const jwt_service_1 = require("../services/jwt-service");
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                if (yield user_model_1.default.findOne({ where: { email } })) {
                    return res.status(400).json({ error: 'User already existis' });
                }
                req.body.password = yield bcryptjs_1.default.hash(req.body.password, 10);
                const user = yield user_model_1.default.create(req.body);
                // user.password = undefined;
                const access_token = yield jwt_service_1.JwtService.generateToken({
                    user_id: user.id,
                    access_token: true
                }, '5 minutes');
                const refresh_token = yield jwt_service_1.JwtService.generateToken({
                    user_id: user.id,
                    refresh_token: true
                }, '1 hour');
                return res.json({ user, access_token, refresh_token });
            }
            catch (error) {
                return res.status(500).json({ error: 'Registration failed' });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth-controller.js.map