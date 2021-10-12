import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

export const AuthMiddleware = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    try {
        if(!authHeader)
            return res.status(401).json({ error: 'No token provided' });

        const parts = authHeader.split(' ');

        if(parts.length === 2) {
            const [ scheme, token ] = parts;

            if(!/^Bearer$/i.test(scheme))
                return res.status(401).json({ error: 'Token malformated' });

            jwt.verify(token, authConfig.JWT_KEY, (error: any, decoded: any) => {
                if(error) return res.status(401).json({ error: 'Invalid Token' });

                req.userId = decoded.id;

                next();
            })
        } else {
            return res.status(401).json({ error: 'Token error' });

        }




    } catch(error) {
        return res.status(401).json({ error: 'Invalid Token' });

    }

}
