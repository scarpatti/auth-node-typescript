import User from "../models/user-model";

export class UserController  {
    public static async index({}, res: any) {
        const users = await User.findAll();

        return res.status(200).json(users);
    }

    public static async store(req: any, res: any) {
        const { name, email, password} = req.body;

        const user = await User.create({ name, email, password });

        return res.json(user);
    }
}
