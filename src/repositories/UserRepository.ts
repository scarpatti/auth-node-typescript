import { Permission, Prisma, Role, RoleType, User } from "@prisma/client";
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
          status: true,
          Role: true,
          Company: true,
          createdAt: true,
          updatedAt: true
        },
        where: {
          companyId: request.user.companyId
        }
      },
    );
  }

  public static async findByEmailWithPassword(email: string): Promise<User | null> {
    return await prismaClient.user
      .findUnique({
        where: { email },
      });
  }

  public static async find(
    userId: string
  ): Promise<
    Omit<User, 'password'>
    & { Role: Role
      & { Permissions?: Permission[] }
      & { RoleType: RoleType }}
  | null> {
    return await prismaClient.user
      .findUnique({
        where: { id: userId },
        include: {
          Role: {
            include: {
              Permissions: true,
              RoleType: true
            }
          }
        }
      });
  }

  public static async store(data: Prisma.UserCreateManyInput): Promise<User> {
    return await prismaClient.user
      .create({ data });
  }

  public static async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await prismaClient.user
      .update({
        where: {
          id: id
        },
        data: data
      });
  }
}
