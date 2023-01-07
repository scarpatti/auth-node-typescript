import { Pump, Prisma } from "@prisma/client";
import prismaClient from "../database";

export default class PumpRepository {
  public static async findAll(request: any): Promise<Pump[]  | null> {
    return await request.paginate(
      prismaClient.pump,
      {
        where: {
          companyId: request.user.companyId
        }
      },
    );
  }

  public static async find(
    pumpId: number
  ): Promise<Pump | null> {
    return await prismaClient.pump
      .findUnique({
        where: { id: pumpId },
      });
  }

  public static async store(data: Prisma.PumpCreateInput): Promise<Pump> {
    return await prismaClient.pump
      .create({ data });
  }

  public static async update(id: number, data: Prisma.PumpUpdateInput): Promise<Pump> {
    return await prismaClient.pump
      .update({
        where: {
          id: id
        },
        data: data
      });
  }
}
