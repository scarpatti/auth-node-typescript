import { Prisma, User } from "@prisma/client";
import prismaClient from "../database";

export default class UserRepository {
  public static async findAll(): Promise<Omit<User, "password">[]  | null> {
    return await prismaClient.user
      .findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      });
  }

  public static async findByEmailWithPassword(email: string): Promise<User | null> {
    return await prismaClient.user
      .findUnique({
        where: { email },
      });
  }

  public static async store(data: Prisma.UserCreateInput): Promise<User> {
    return await prismaClient.user
      .create({ data });
  }
}
