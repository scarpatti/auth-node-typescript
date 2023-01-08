import { Reel, Prisma } from "@prisma/client";
import prismaClient from "../database";

export default class ReelRepository {
  public static async findAll(request: any): Promise<Reel[]  | null> {
    return await request.paginate(
      prismaClient.reel,
      {
        where: {
          companyId: request.user.companyId
        }
      },
    );
  }

  public static async find(
    reelId: number
  ): Promise<Reel | null> {
    return await prismaClient.reel
      .findUnique({
        where: { id: reelId },
      });
  }

  public static async store(data: Prisma.ReelCreateInput): Promise<Reel> {
    return await prismaClient.reel
      .create({ data });
  }

  public static async update(id: number, data: Prisma.ReelUpdateInput): Promise<Reel> {
    return await prismaClient.reel
      .update({
        where: {
          id: id
        },
        data: data
      });
  }
}
