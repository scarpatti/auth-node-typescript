import { JwtService } from "../services/JwtService";
import { NextFunction, Request, Response } from "express";

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

    JwtService.verify(token).then((decoded: any) => {
      if(!decoded.access_token) {
        return response.sendStatus(401).json(
          {
            message: 'Not authenticated',
            error: 'Invalid Token',
          }
        );
      }

      response.locals.user_id = decoded.user_id;

      next();

    }).catch(() => {
      return response.sendStatus(401).json(
        {
          message: 'Not authenticated',
          error: 'Invalid Token',
        }
      );
    });

  } catch(error) {
    return response.sendStatus(401).json(
      {
        message: 'Not authenticated',
        error: 'Invalid Token',
      }
    );
  }
}
