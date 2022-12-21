import { Prisma, User } from "@prisma/client";
import prismaClient from "../database";

export default class UserRepository {
  public static async findAll(): Promise<User[] | null> {
    return await prismaClient.user
      .findMany()
      .catch((e) => e);
  }

  public static async findByEmail(email: string): Promise<User | null> {
    return await prismaClient.user
      .findUnique({ where: { email } })
      .catch((e) => e);
  }

  public static async store(data: Prisma.UserCreateInput): Promise<User> {
    return await prismaClient.user
      .create({ data })
      .catch((e) => e);
  }
}
