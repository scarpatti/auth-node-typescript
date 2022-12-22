import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { Resource } from "../resource";
import { UserStoreValidator } from "../validators/UserValidator";

export class UserController  {
  public static async index(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await UserRepository.findAll(request);

      next((new Resource).index({
        response: response,
        resources: users,
        message: "Users found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async store(request: Request, response: Response, next: NextFunction) {
    const data = request.body;

    try {
      await UserStoreValidator.parseAsync({ ...data });

      const user = await UserRepository.store(data);

      next((new Resource).create({
        response: response,
        resources: user,
        message: "User created"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }
}
