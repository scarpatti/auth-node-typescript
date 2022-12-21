import client from '../cache';

export default class JwtRepository {
    public static store = (key: string, expiresIn: number | string, value: string) => new Promise((resolve, reject) => {
        expiresIn = expiresIn as unknown as number;

        client.setex(key, expiresIn, value, (err: Error | null, reply: any) => {
            if(err) {
                reject(new Error('Redis save filed'));
            }

            resolve(reply);
        });
    })

    public static get = (key: string) => new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if(err) {
                reject(new Error('Redis get filed'));
            }

            resolve(reply);
        })
    })
}
