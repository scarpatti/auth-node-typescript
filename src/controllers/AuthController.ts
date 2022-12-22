import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { JwtService } from "../services/JwtService";
import UserService from "../services/UsersService";
import { UserAuthenticateValidator, UserStoreValidator } from "../validators/UserValidator";

export class AuthController {
  public static async register(request: Request, response: Response) {
    const data = request.body;

    try {
      const result = await UserStoreValidator.safeParseAsync({ ...data });

      if (!result.success) {
        return response.status(422).send(
          {
            message: "Validation error",
            error: result.error.message
          }
        );
      }

      const user = await UserService.store(request.body);

      if(user) {
        const access_token = await JwtService.generateAccessToken(user.id);

        const refresh_token = await JwtService.generateAccessToken(user.id);

        return response.status(201).json({
          resources: {
            user,
            access_token,
            refresh_token
          },
          message: "User created"
        });
      } else {
        return response.status(500).json({
          message: 'Registration failed',
          error: 'Registration failed'
        });

      }
    } catch(error) {
      return response.status(500).json({
        message: 'Registration failed',
        error: 'Registration failed'
      });

    }
  }

  public static async authenticate(request: Request, response: Response) {
    const data = request.body;

    const result = await UserAuthenticateValidator.safeParseAsync({ ...data });

    if (!result.success) {
      return response.status(422).send(
        {
          message: "Validation error",
          error: result.error.message
        }
      );
    }

    const user = await UserRepository.findByEmail(data.email);

    if(!user || !await UserService.checkPassword(data.password, user.password)) {
      return response.status(400).json({
        message: 'Credentials incorect',
        error: 'Password incorect'
      });
    }

    const access_token = await JwtService.generateAccessToken(user.id);

    const refresh_token = await JwtService.generateRefreshToken(user.id);

    return response.status(200).json({
      resources: {
        ...user,
        access_token,
        refresh_token
      },
      message: "User authenticated"
    });
  }

  public static async refresh(request: Request, response: Response) {
    try {
      const refresh_token = request.headers.authorization;

      if(!refresh_token)
        return response.status(401).json({
          message: 'No token provided',
          error: 'No token provided'
        });

      const token = JwtService.separate(refresh_token);

      JwtService.verify(token).then(async (decoded: any) => {
        if(!decoded.refresh_token) {
          return response.sendStatus(401).json(
            {
              message: 'Not authenticated',
              error: 'Not authenticated',
            }
          );
        }

        const access_token = await JwtService.generateAccessToken( decoded.user_id );

        return response.json({
          message: 'Token generated',
          resources: {
            access_token: access_token,
            refresh_token: decoded.refresh_token
          }
        });

      }).catch(() => {
        return response.status(401).json({
          message: 'Not authenticated',
          error: 'Invalid Token'
        });

      }) ;

    } catch(error) {
      return response.sendStatus(401).json(
        {
          message: 'Not authenticated',
          error: 'Not authenticated',
        }
      );
    }
  }

  public static async logout(request: Request, response: Response) {
    const authHeader = request.headers.authorization;

    if(authHeader) {
      try {
        const token = JwtService.separate(authHeader);

        const result = await JwtService.revokeAccessToken(token);

        if(result) {
            return response.status(200).json({ message: "Token invalidated" });

        } else {
          return response.status(401).json({
            message: 'Invalid Token',
            error: 'Invalid Token'
          });

        }

      } catch(error) {
        return response.status(401).json({
          message: 'Invalid Token',
          error: 'Invalid Token'
        });

      }
    }
  }
}
