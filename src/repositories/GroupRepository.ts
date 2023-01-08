import { Group, Prisma } from "@prisma/client";
import prismaClient from "../database";

export default class GroupRepository {
  public static async findAll(request: any): Promise<Group[]  | null> {
    return await request.paginate(
      prismaClient.group,
      {
        include: {
          Pump: true,
          Reel: true,
          Cart: true,
        },
        where: {
          companyId: request.user.companyId
        }
      },
    );
  }

  public static async find(
    groupId: number
  ): Promise<Group | null> {
    return await prismaClient.group
      .findUnique({
        where: { id: groupId },
      });
  }

  public static async store(data: Prisma.GroupCreateInput): Promise<Group> {
    return await prismaClient.group
      .create({ data });
  }

  public static async update(id: number, data: Prisma.GroupUpdateInput): Promise<Group> {
    return await prismaClient.group
      .update({
        where: {
          id: id
        },
        data: data
      });
  }
}
