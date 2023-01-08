import { Zone, Prisma } from "@prisma/client";
import prismaClient from "../database";

export default class ZoneRepository {
  public static async findAll(request: any): Promise<Zone[]  | null> {
    return await request.paginate(
      prismaClient.zone,
      {
        where: {
          companyId: request.user.companyId
        }
      },
    );
  }

  public static async find(
    zoneId: number
  ): Promise<Zone | null> {
    return await prismaClient.zone
      .findUnique({
        where: { id: zoneId },
      });
  }

  public static async store(data: Prisma.ZoneCreateInput): Promise<Zone> {
    return await prismaClient.zone
      .create({ data });
  }

  public static async update(id: number, data: Prisma.ZoneUpdateInput): Promise<Zone> {
    return await prismaClient.zone
      .update({
        where: {
          id: id
        },
        data: data
      });
  }
}
