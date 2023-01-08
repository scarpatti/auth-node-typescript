import { NextFunction, Request, Response } from "express";
import Policy from "../Policies/Policy";
import SectionRepository from "../repositories/SectionRepository";
import { Resource } from "../resource";
import { SectionStoreValidator, SectionUpdateValidator } from "../validators/SectionValidator";

export class SectionController  {
  public static async index(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['list-sections']);

      const sections = await SectionRepository.findAll(request);

      next((new Resource).index({
        response: response,
        resources: sections,
        message: "Sections found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async show(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['show-sections']);

      const id = Number(request.params.id);

      const section = await SectionRepository.find(id);

      next((new Resource).show({
        response: response,
        resources: section,
        message: "Section found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async store(request: Request, response: Response, next: NextFunction) {
    let data = request.body;

    try {
      Policy.check(request, ['create-sections']);

      data = await SectionStoreValidator.parseAsync({ ...data });

      const section = await SectionRepository.store(data);

      next((new Resource).create({
        response: response,
        resources: section,
        message: "Section created"
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
      Policy.check(request, ['update-sections']);

      data = await SectionUpdateValidator.parseAsync({ ...data, id });
      delete data.id;

      const section = await SectionRepository.update(id, data);

      next((new Resource).update({
        response: response,
        resources: section,
        message: "Section updated"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }
}
