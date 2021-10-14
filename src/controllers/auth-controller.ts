import User from "../models/user-model";
import { JwtService } from "../services/jwt-service";

export class AuthController {
    public static async register(req: any, res: any) {
        const { email } = req.body;

        try {
            if(await User.findOne({ where: { email }})) {
                return res.status(400).json({ error: 'User already existis' });
            }

            const user = await User.create(req.body);

            const access_token = await JwtService.generateAccessToken(user);

            const refresh_token = await JwtService.generateAccessToken(user);

            return res.json({ user, access_token, refresh_token });

        } catch(error) {
            return res.status(500).json({ error: 'Registration failed' });

        }
    }

    public static async authenticate(req: any, res: any) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }});

        if(!user) {
            return res.status(400).json({ error: 'User not found' });

        }

        if(!await user.checkPassword(password)) {
            return res.status(400).json({ error: 'Password incorect' });

        }

        const access_token = await JwtService.generateAccessToken(user);

        const refresh_token = await JwtService.generateAccessToken(user);

        return res.json({ user, access_token, refresh_token });

    }

    public static async refresh(req: any, res: any) {
        try {
            const refresh_token = req.headers.authorization;

            if(!refresh_token)
                return res.status(401).json({ error: 'No token provided' });

            const token = JwtService.separate(refresh_token);

            JwtService.verify(token).then(async (decoded: any) => {
                if(!decoded.refresh_token) {
                    return res.sendStatus(401);
                }

                const access_token = await JwtService.generateAccessToken(new User({ id: decoded.user_id }));

                return res.json({
                    access_token,
                    refresh_token
                });

            }).catch(() => {
                return res.status(401).json({ error: 'Invalid Token' });

            }) ;

        } catch(error) {
            return res.sendStatus(401);

        }
    }

    // public static async me(req: any, res: any) {
    //     res.json({ user: await User.findByPk(req.userId) });
    // }
}
