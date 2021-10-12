import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

if(!authConfig.JWT_KEY || !authConfig.JWT_EXPIRED)
    throw new Error('JWT_KEY or JWT_EXPIRED not found!');

export class JwtService {
    public static generateToken = (payload: any, expiresIn: string) => new Promise((resolve, reject) => {
        jwt.sign(payload, authConfig.JWT_KEY, {
            expiresIn: expiresIn
        }, (erorr: any, token: any) => {
            if (erorr) {
                reject(erorr);
            } else {
                resolve(token);
            }
        });
    })
}
