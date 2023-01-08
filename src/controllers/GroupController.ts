import { NextFunction, Request, Response } from "express";
import Policy from "../Policies/Policy";
import GroupRepository from "../repositories/GroupRepository";
import { Resource } from "../resource";
import { GroupStoreValidator, GroupUpdateValidator } from "../validators/GroupValidator";

export class GroupController  {
  public static async index(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['list-groups']);

      const groups = await GroupRepository.findAll(request);

      next((new Resource).index({
        response: response,
        resources: groups,
        message: "Groups found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async show(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['show-groups']);

      const id = Number(request.params.id);

      const group = await GroupRepository.find(id);

      next((new Resource).show({
        response: response,
        resources: group,
        message: "Group found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async store(request: Request, response: Response, next: NextFunction) {
    let data = request.body;

    try {
      Policy.check(request, ['create-groups']);

      data = await GroupStoreValidator.parseAsync({ ...data });

      const group = await GroupRepository.store(data);

      next((new Resource).create({
        response: response,
        resources: group,
        message: "Group created"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }
  public static async update(request: Request, response: Response, next: NextFunction) {
    const id = Number(request.params.id);
    let data = request.body;

    try {
      Policy.check(request, ['update-groups']);

      data = await GroupUpdateValidator.parseAsync({ ...data, id });
      delete data.id;

      const group = await GroupRepository.update(id, data);

      next((new Resource).update({
        response: response,
        resources: group,
        message: "Group updated"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }
}
