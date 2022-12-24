import ResourceType, { SendResourceProps } from "../types/types";
import { Response } from "express";

export class Resource {
  send({ response, code, resources, message, errors }: SendResourceProps & {code: number}): Response {
    const result: ResourceType = {
      message: message,
      resources: resources,
      errors: errors,
    };

    return response.status(code).json(result);
  }
  public index({ response, resources, message }: SendResourceProps): Response {
    return this.send({
      response,
      code: resources ? 200 : 204,
      resources,
      message,
    });
  }

  public show({ response, resources, message }: SendResourceProps): Response {
    return this.send({
      response,
      code: resources ? 200 : 404,
      message,
      resources,
    });
  }

  public create({ response, resources, message }: SendResourceProps): Response {
    return this.send({
      response,
      code: 201,
      message,
      resources,
    });
  }
  public update({ response, resources, message }: SendResourceProps): Response {
    return this.send({
      response,
      code: 200,
      resources,
      message,
    });
  }

  public delete({ response, message }: SendResourceProps): Response {
    return this.send({
      response,
      code: 204,
      message,
    });
  }

  public error({ response, code, message, errors }: SendResourceProps): Response {
    return this.send({
      response,
      code: code ?? 500,
      errors,
      message: message ?? "Unknown Error",
    });
  }
}
