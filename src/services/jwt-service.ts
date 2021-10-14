import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';
import User from '../models/user-model';
import jwtRepository from '../repositories/jwt-repository';

if(!jwtConfig.JWT_KEY || !jwtConfig.JWT_ACCESS_TOKEN_EXPIRED || !jwtConfig.JWT_REFRESH_TOKEN_EXPIRED)
    throw new Error('JWT_KEY, JWT_ACCESS_TOKEN_EXPIRED OR JWT_REFRESH_TOKEN_EXPIRED not found!');

export class JwtService {
    public static generateAccessToken = async (user: User) => new Promise((resolve, reject) => {
        this.generateToken({
                user_id: user.id,
                access_token: true
            },
            jwtConfig.JWT_ACCESS_TOKEN_EXPIRED,
            (err: any, token: any) => {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    resolve(token);
                }
            }
        );
    })

    public static generateRefreshToken = async (user: User) => new Promise((resolve, reject) => {
        this.generateToken({
                user_id: user.id,
                refresh_token: true
            },
            jwtConfig.JWT_REFRESH_TOKEN_EXPIRED,
            (err: any, token: any) => {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    resolve(token);
                }
            }
        );
    })

    public static generateToken = (payload: any, expiresIn: number | string, callback: any) => {
        jwt.sign(payload, jwtConfig.JWT_KEY, {
            expiresIn: expiresIn
        }, callback);
    }

    public static revokeAccessToken = (token: string) => new Promise((resolve, reject) => {
        this.revokeToken(jwtConfig.JWT_REDIS_KEY_NAME + token, jwtConfig.JWT_ACCESS_TOKEN_EXPIRED as unknown as number)
            .then((response: any) => resolve(response))
            .catch((err: Error) => reject(err));
    })

    public static revokeRefreshToken = (token: string) => new Promise((resolve, reject) => {
        this.revokeToken(token, jwtConfig.JWT_REFRESH_TOKEN_EXPIRED as unknown as number)
            .then((response: any) => resolve(response))
            .catch((err: Error) => reject(err));
    })

    public static revokeToken = async (token: string, expiresIn: number) => {
        return await jwtRepository.store(jwtConfig.JWT_REDIS_KEY_NAME + token, expiresIn, '');
    }

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
