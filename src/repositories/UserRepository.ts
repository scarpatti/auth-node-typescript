import { Prisma, User } from "@prisma/client";
import { Request } from "express";
import { PaginatedResult, PaginateFunction } from "prisma-pagination";
import prismaClient from "../database";

export default class UserRepository {
  public static async findAll(request: any): Promise<Omit<User, "password">[]  | null> {
    return await request.paginate(
      prismaClient.user,
      {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      }
    );
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
