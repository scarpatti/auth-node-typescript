import { NextFunction, Request, Response } from "express";
import Policy from "../Policies/Policy";
import UserRepository from "../repositories/UserRepository";
import { Resource } from "../resource";
import UserService from "../services/UserService";
import { UserStoreValidator, UserUpdateValidator } from "../validators/UserValidator";

export class UserController  {
  public static async index(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['list-users']);

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

  public static async show(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['show-users']);

      const userId = request.params.id;

      const user = await UserRepository.find(userId);

      next((new Resource).show({
        response: response,
        resources: user,
        message: "User found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async profile(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await UserRepository.find(request.user.id);

      const permissions = user?.Role.Permissions?.map((permission) => {
        return permission.slug;
      });

      delete user?.Role.Permissions;

      next((new Resource).show({
        response: response,
        resources: {
          ...user,
          permissions
        },
        message: "User found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async store(request: Request, response: Response, next: NextFunction) {
    let data = request.body;

    try {
      Policy.check(request, ['create-users']);

      data = await UserStoreValidator.parseAsync({ ...data });

      const user = await UserService.store(data);

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
  public static async update(request: Request, response: Response, next: NextFunction) {
    const userId = request.params.id;
    let data = request.body;

    try {
      Policy.check(request, ['update-users']);

      data = await UserUpdateValidator.parseAsync({ ...data, userId });
      delete data.userId;

      const user = await UserService.update(userId, data);

      next((new Resource).update({
        response: response,
        resources: user,
        message: "User updated"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }
}
