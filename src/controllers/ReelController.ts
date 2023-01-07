import { NextFunction, Request, Response } from "express";
import Policy from "../Policies/Policy";
import ReelRepository from "../repositories/ReelRepository";
import { Resource } from "../resource";
import { ReelStoreValidator, ReelUpdateValidator } from "../validators/ReelValidator";

export class ReelController  {
  public static async index(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['list-reels']);

      const reels = await ReelRepository.findAll(request);

      next((new Resource).index({
        response: response,
        resources: reels,
        message: "Reels found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async show(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['show-reels']);

      const id = Number(request.params.id);

      const reel = await ReelRepository.find(id);

      next((new Resource).show({
        response: response,
        resources: reel,
        message: "Reel found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async store(request: Request, response: Response, next: NextFunction) {
    let data = request.body;

    try {
      Policy.check(request, ['create-reels']);

      data = await ReelStoreValidator.parseAsync({ ...data });

      const reel = await ReelRepository.store(data);

      next((new Resource).create({
        response: response,
        resources: reel,
        message: "Reel created"
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
      Policy.check(request, ['update-reels']);

      data = await ReelUpdateValidator.parseAsync({ ...data, id });
      delete data.id;

      const reel = await ReelRepository.update(id, data);

      next((new Resource).update({
        response: response,
        resources: reel,
        message: "Reel updated"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }
}
