import { JwtService } from "../services/JwtService";

export const AuthMiddleware = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    try {
        if(!authHeader)
            return res.status(401).json({ error: 'No token provided' });

        const token = JwtService.separate(authHeader);

        JwtService.verify(token).then((decoded: any) => {
            if(!decoded.access_token) {
                return res.sendStatus(401);
            }

            res.locals.user_id = decoded.user_id;

            next();

        }).catch(() => {
            return res.status(401).json({ error: 'Invalid Token' });

        });

    } catch(error) {
        return res.status(401).json({ error: 'Invalid Token' });

    }

}
