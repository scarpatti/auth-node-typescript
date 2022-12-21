import UserRepository from "../repositories/UserRepository";
import { UserStoreValidator } from "../validators/UserValidator";

export class UserController  {
  public static async index({}, res: any) {
    const users = await UserRepository.findAll();

    return res.status(200).json(users);
  }

  public static async store(request: any, response: any) {
    const data = request.body;

    const result = await UserStoreValidator.safeParseAsync({ ...data });

    if (!result.success) {
      response.status(422).send(result.error.message);
      return;
    }

    const user = await UserRepository.store(data);

    return response.json(user);
  }
}
