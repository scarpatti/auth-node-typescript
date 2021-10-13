import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

if(!authConfig.JWT_KEY || !authConfig.JWT_EXPIRED)
    throw new Error('JWT_KEY or JWT_EXPIRED not found!');

export class JwtService {
    public static generateToken = async (payload: any, expiresIn: number | string) => new Promise((resolve, reject) => {
        jwt.sign(payload, authConfig.JWT_KEY, {
            expiresIn: expiresIn
        }, (err, token) => {
            if (err) {
                reject(new Error(err.message));
            } else {
                resolve(token);
            }
        });
    })

    public static verify = (token: string) => new Promise((resolve, reject) => {
        jwt.verify(token, authConfig.JWT_KEY, (err, decoded) => {
            if (err) {
                reject(new Error(err.message));
            }

            resolve(decoded);
        });

        // decoded ? resolve(decoded) : reject(new Error('Error verfy token'));
    })

    public static separate = (str: string) => {
        const parts = str.split(' ');

        if(!(parts.length === 2))
            throw new Error('Token error');

        const [ scheme, token ] = parts;

        if(!/^Bearer$/i.test(scheme))
            throw new Error('Token malformated');


        return token;
    }
}
