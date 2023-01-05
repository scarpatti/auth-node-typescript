import { NextFunction, Request, Response } from "express";
import RoleRepository from "../repositories/RoleRepository";
import { Resource } from "../resource";

export class RoleController  {
  public static async index(request: Request, response: Response, next: NextFunction) {
    try {
      const where = request.user.Role.name != 'Super Administrador' ? {
        where: {
          RoleType: {
            name: {
              notIn: [
                'Super administrador'
              ]
            }
          }
        }
      }: {}

      const roles = await RoleRepository.findAll(request, where);

      next((new Resource).index({
        response: response,
        resources: roles,
        message: "Roles found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }
}
