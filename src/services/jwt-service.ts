import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';
import User from '../models/user-model';

if(!jwtConfig.JWT_KEY || !jwtConfig.JWT_ACCESS_TOKEN_EXPIRED || !jwtConfig.JWT_REFRESH_TOKEN_EXPIRED)
    throw new Error('JWT_KEY, JWT_ACCESS_TOKEN_EXPIRED OR JWT_REFRESH_TOKEN_EXPIRED not found!');

export class JwtService {
    public static generateAccessToken = async (user: User) => {
        return await this.generateToken({
            user_id: user.id,
            access_token: true
        }, jwtConfig.JWT_ACCESS_TOKEN_EXPIRED);
    }

    public static generateRefreshToken = async (user: User) => {
        return await this.generateToken({
            user_id: user.id,
            refresh_token: true
        }, jwtConfig.JWT_REFRESH_TOKEN_EXPIRED);
    }

    public static generateToken = async (payload: any, expiresIn: number | string) => new Promise((resolve, reject) => {
        jwt.sign(payload, jwtConfig.JWT_KEY, {
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
        jwt.verify(token, jwtConfig.JWT_KEY, (err, decoded) => {
            if (err) {
                reject(new Error(err.message));
            }

            resolve(decoded);
        });
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
