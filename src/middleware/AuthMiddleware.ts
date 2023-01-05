import { JwtService } from "../services/JwtService";
import { NextFunction, Request, Response } from "express";
import { UnauthenticatedExcepition } from "../exceptions/UnauthenticatedExcepition";
import UserService from "../services/UserService";

export const AuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  try {
    if(!authHeader)
      return response.status(401).json({
        message: 'Not authenticated',
        error: 'No token provided'
      });

    const token = JwtService.separate(authHeader);

    // token in deny list?
    const inDenyList = await JwtService.verifyIsRevoked(token);

    if (inDenyList) {
      return response.sendStatus(401).json(
        {
          message: 'Not authenticated',
          error: 'JWT Rejected',
        }
      );
    }

    JwtService.verify(token).then(async (decoded: any) => {
      if(!decoded.access_token) {
        return response.sendStatus(401).json(
          {
            message: 'Not authenticated',
            error: 'Invalid Token',
          }
        );
      }

      const user = await UserService.find(decoded.user_id);

      if(user) {
        request.user = user;
        next();

      } else {
        next(new UnauthenticatedExcepition('User not found'));
      }

    }).catch((error) => {
      next(new UnauthenticatedExcepition('Invalid Token'));
      return;
    });

  } catch(error) {
    next(new UnauthenticatedExcepition('Invalid Token'));
    return;
  }
}
