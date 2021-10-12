import bcrypt from "bcryptjs";
import User from "../models/user-model";
import { JwtService } from "../services/jwt-service";

export class AuthController {
    public static async register(req: any, res: any) {
        const { email } = req.body;

        try {
            if(await User.findOne({ where: { email }})) {
                return res.status(400).json({ error: 'User already existis' });
            }

            req.body.password = await bcrypt.hash(req.body.password, 10);

            const user = await User.create(req.body);

            // user.password = undefined;

            const access_token = await JwtService.generateToken({
                user_id: user.id,
                access_token: true
            }, '5 minutes');

            const refresh_token = await JwtService.generateToken({
                user_id: user.id,
                refresh_token: true
            }, '1 hour');

            return res.json({ user, access_token, refresh_token });

        } catch(error) {
            return res.status(500).json({ error: 'Registration failed' });

        }
    }

    // public static async authenticate(req: any, res: any) {
    //     const { email, password } = req.body;

    //     const user = await User.findOne({ where: { email }});

    //     if(!user) {
    //         return res.status(400).json({ error: 'User not found' });

    //     }

    //     if(!await bcrypt.compare(password, user.password)) {
    //         return res.status(400).json({ error: 'Password incorect' });

    //     }

    //     // user.password = undefined;

    //     const access_token = await JwtService.generateToken({
    //         user_id: user.id,
    //         access_token: true
    //     }, '5 minutes');

    //     const refresh_token = await JwtService.generateToken({
    //         user_id: user.id,
    //         refresh_token: true
    //     }, '1 hour');

    //     return res.json({ user, access_token, refresh_token });

    // }

    // public static async me(req: any, res: any) {
    //     res.json({ user: await User.findByPk(req.userId) });
    // }
}
