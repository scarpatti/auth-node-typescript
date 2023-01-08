import { NextFunction, Request, Response } from "express";
import Policy from "../Policies/Policy";
import ZoneRepository from "../repositories/ZoneRepository";
import { Resource } from "../resource";
import { ZoneStoreValidator, ZoneUpdateValidator } from "../validators/ZoneValidator";

export class ZoneController  {
  public static async index(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['list-zones']);

      const zones = await ZoneRepository.findAll(request);

      next((new Resource).index({
        response: response,
        resources: zones,
        message: "Zones found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async show(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['show-zones']);

      const id = Number(request.params.id);

      const zone = await ZoneRepository.find(id);

      next((new Resource).show({
        response: response,
        resources: zone,
        message: "Zone found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async store(request: Request, response: Response, next: NextFunction) {
    let data = request.body;

    try {
      Policy.check(request, ['create-zones']);

      data = await ZoneStoreValidator.parseAsync({ ...data });

      const zone = await ZoneRepository.store(data);

      next((new Resource).create({
        response: response,
        resources: zone,
        message: "Zone created"
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
      Policy.check(request, ['update-zones']);

      data = await ZoneUpdateValidator.parseAsync({ ...data, id });
      delete data.id;

      const zone = await ZoneRepository.update(id, data);

      next((new Resource).update({
        response: response,
        resources: zone,
        message: "Zone updated"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }
}
