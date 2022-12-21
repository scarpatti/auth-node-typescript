import UserRepository from "../repositories/UserRepository";
import { JwtService } from "../services/JwtService";
import UserService from "../services/UsersService";
import { UserAuthenticateValidator, UserStoreValidator } from "../validators/UserValidator";

export class AuthController {
    public static async register(request: any, response: any) {
        const data = request.body;

        try {
            const result = await UserStoreValidator.safeParseAsync({ ...data });

            if (!result.success) {
              response.status(422).send(result.error.message);
              return;
            }

            const user = await UserService.store(request.body);

            if(user) {
              const access_token = await JwtService.generateAccessToken(user.id);

              const refresh_token = await JwtService.generateAccessToken(user.id);

              return response.status(201).json({
                data: {
                  user,
                  access_token,
                  refresh_token
                },
                message: "User created"
              });
            } else {
              return response.status(500).json({ error: 'Registration failed' });

            }

        } catch(error) {
            return response.status(500).json({ error: 'Registration failed' });

        }
    }

    public static async authenticate(request: any, response: any) {
        const data = request.body;

        const result = await UserAuthenticateValidator.safeParseAsync({ ...data });

        if (!result.success) {
          response.status(422).send(result.error.message);
          return;
        }

        const user = await UserRepository.findByEmail(data.email);

        if(!user || !await UserService.checkPassword(data.password, user.password)) {
            return response.status(400).json({ error: 'Password incorect' });
        }

        const access_token = await JwtService.generateAccessToken(user.id);

        const refresh_token = await JwtService.generateRefreshToken(user.id);

        return response.status(200).json({
          data: {
            user,
            access_token,
            refresh_token
          },
          message: "User authenticated"
        });
    }

    public static async refresh(request: any, response: any) {
        try {
            const refresh_token = request.headers.authorization;

            if(!refresh_token)
                return request.status(401).json({ error: 'No token provided' });

            const token = JwtService.separate(refresh_token);

            JwtService.verify(token).then(async (decoded: any) => {
                if(!decoded.refresh_token) {
                    return request.sendStatus(401);
                }

                const access_token = await JwtService.generateAccessToken( decoded.user_id );

                return response.json({
                    access_token: access_token,
                    refresh_token: decoded.refresh_token
                });

            }).catch(() => {
                return response.status(401).json({ error: 'Invalid Token' });

            }) ;

        } catch(error) {
            return response.sendStatus(401);

        }
    }

    // public static async me(req: any, res: any) {
    //     res.json({ user: await User.findByPk(req.userId) });
    // }
}
