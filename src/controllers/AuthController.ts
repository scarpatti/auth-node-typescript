import { NextFunction, Request, Response } from "express";
import { Exception } from "../Exceptions/Exception";
import { TokenExcepition } from "../exceptions/TokenExcepition";
import { UnauthenticatedExcepition } from "../exceptions/UnauthenticatedExcepition";
import UserRepository from "../repositories/UserRepository";
import { Resource } from "../resource";
import { JwtService } from "../services/JwtService";
import UserService from "../services/UsersService";
import { UserAuthenticateValidator, UserStoreValidator } from "../validators/UserValidator";

export class AuthController {
  public static async register(request: Request, response: Response, next: NextFunction) {
    const data = request.body;

    try {
      await UserStoreValidator.parseAsync({ ...data });

      const user = await UserService.store(request.body);

      if(user) {
        const access_token = await JwtService.generateAccessToken(user.id);

        const refresh_token = await JwtService.generateAccessToken(user.id);

        next((new Resource).create({
          response: response,
          resources: {
            user,
            access_token,
            refresh_token
          },
          message: "User created"
        }));
        return;

      } else {
        next(new Exception('Registration failed'));
      }

    } catch(error) {
      next(error);
    }
  }

  public static async authenticate(request: Request, response: Response, next: NextFunction) {
    try {
      const data = request.body;

      await UserAuthenticateValidator.parseAsync({ ...data });

      const user = await UserRepository.findByEmailWithPassword(data.email);

      if(!user || !await UserService.checkPassword(data.password, user.password)) {
        next(new Exception(
          'Credentials incorect',
          400,
          'Password incorect'
        ));
      } else {
        const access_token = await JwtService.generateAccessToken(user.id);

        const refresh_token = await JwtService.generateRefreshToken(user.id);

        user ?? delete user["password"];

        next((new Resource).show({
          response: response,
          resources: {
            ...user,
            access_token,
            refresh_token
          },
          message: "User authenticated"
        }));
        return;
      }

    } catch(error) {
      next(error);
    }
  }

  public static async refresh(request: Request, response: Response, next: NextFunction) {
    try {
      const refresh_token = request.headers.authorization;

      if(!refresh_token) {
        next(new TokenExcepition('No token provided'));

      } else {
        const token = JwtService.separate(refresh_token);

        JwtService.verify(token).then(async (decoded: any) => {
          if(!decoded.refresh_token) {
            next(new TokenExcepition('No token provided'));
          }

          const access_token = await JwtService.generateAccessToken( decoded.user_id );
          const refresh_token = await JwtService.generateRefreshToken( decoded.user_id );

          next((new Resource).show({
            response: response,
            resources: {
              access_token: access_token,
              refresh_token: refresh_token
            },
            message: 'Token generated'
          }));
          return;

        }).catch(() => {
          next(new TokenExcepition('Invalid Token'));
        });

      }
    } catch(error) {
      next(new TokenExcepition('Invalid Token'));
    }
  }

  public static async logout(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(authHeader) {
      try {
        const token = JwtService.separate(authHeader);

        const result = await JwtService.revokeAccessToken(token);

        if(result) {
          next((new Resource).show({
            response: response,
            resources: { token: token },
            message: "Token invalidated"
          }));
          return;

        } else {
          next(new UnauthenticatedExcepition('Invalid Token'));
        }

      } catch(error) {
        next(new UnauthenticatedExcepition('Invalid Token'));
      }
    }
  }
}
