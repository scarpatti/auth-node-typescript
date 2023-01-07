import { NextFunction, Request, Response } from "express";
import Policy from "../Policies/Policy";
import PumpRepository from "../repositories/PumpRepository";
import { Resource } from "../resource";
import { PumpStoreValidator, PumpUpdateValidator } from "../validators/PumpValidator";

export class PumpController  {
  public static async index(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['list-pumps']);

      const pumps = await PumpRepository.findAll(request);

      next((new Resource).index({
        response: response,
        resources: pumps,
        message: "Pumps found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async show(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['show-pumps']);

      const id = Number(request.params.id);

      const pump = await PumpRepository.find(id);

      next((new Resource).show({
        response: response,
        resources: pump,
        message: "Pump found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async store(request: Request, response: Response, next: NextFunction) {
    let data = request.body;

    try {
      Policy.check(request, ['create-pumps']);

      data = await PumpStoreValidator.parseAsync({ ...data });

      const pump = await PumpRepository.store(data);

      next((new Resource).create({
        response: response,
        resources: pump,
        message: "Pump created"
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
      Policy.check(request, ['update-pumps']);

      data = await PumpUpdateValidator.parseAsync({ ...data, id });
      delete data.id;

      const pump = await PumpRepository.update(id, data);

      next((new Resource).update({
        response: response,
        resources: pump,
        message: "Pump updated"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }
}
