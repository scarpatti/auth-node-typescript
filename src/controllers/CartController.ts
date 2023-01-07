import { NextFunction, Request, Response } from "express";
import Policy from "../Policies/Policy";
import CartRepository from "../repositories/CartRepository";
import { Resource } from "../resource";
import { CartStoreValidator, CartUpdateValidator } from "../validators/CartValidator";

export class CartController  {
  public static async index(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['list-carts']);

      const carts = await CartRepository.findAll(request);

      next((new Resource).index({
        response: response,
        resources: carts,
        message: "Carts found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async show(request: Request, response: Response, next: NextFunction) {
    try {
      Policy.check(request, ['show-carts']);

      const id = Number(request.params.id);

      const cart = await CartRepository.find(id);

      next((new Resource).show({
        response: response,
        resources: cart,
        message: "Cart found"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }

  public static async store(request: Request, response: Response, next: NextFunction) {
    let data = request.body;

    try {
      Policy.check(request, ['create-carts']);

      data = await CartStoreValidator.parseAsync({ ...data });

      const cart = await CartRepository.store(data);

      next((new Resource).create({
        response: response,
        resources: cart,
        message: "Cart created"
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
      Policy.check(request, ['update-carts']);

      data = await CartUpdateValidator.parseAsync({ ...data, id });
      delete data.id;

      const cart = await CartRepository.update(id, data);

      next((new Resource).update({
        response: response,
        resources: cart,
        message: "Cart updated"
      }));
      return;

    } catch(error) {
      next(error);

    }
  }
}
