import { NextFunction, Request, Response } from "express";
import Policy from "../Policies/Policy";
import PlotRepository from "../repositories/PlotRepository";
import { Resource } from "../resource";
import { PlotStoreValidator, PlotUpdateValidator } from "../validators/PlotValidator";

export class PlotController  {
  public static async index(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['list-plots']);

      const plots = await PlotRepository.findAll(request);

      next((new Resource).index({
        response: response,
        resources: plots,
        message: "Plots found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async show(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['show-plots']);

      const id = Number(request.params.id);

      const plot = await PlotRepository.find(id);

      next((new Resource).show({
        response: response,
        resources: plot,
        message: "Plot found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async store(request: Request, response: Response, next: NextFunction) {
    let data = request.body;

    try {
      Policy.check(request, ['create-plots']);

      data = await PlotStoreValidator.parseAsync({ ...data });

      const plot = await PlotRepository.store(data);

      next((new Resource).create({
        response: response,
        resources: plot,
        message: "Plot created"
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
      Policy.check(request, ['update-plots']);

      data = await PlotUpdateValidator.parseAsync({ ...data, id });
      delete data.id;

      const plot = await PlotRepository.update(id, data);

      next((new Resource).update({
        response: response,
        resources: plot,
        message: "Plot updated"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }
}
