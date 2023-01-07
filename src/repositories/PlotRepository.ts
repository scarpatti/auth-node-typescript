import { Plot, Prisma } from "@prisma/client";
import prismaClient from "../database";

export default class RoleRepository {
  public static async findAll(request: any): Promise<Plot[]  | null> {
    return await request.paginate(
      prismaClient.plot,
      {
        where: {
          companyId: request.user.companyId
        }
      },
    );
  }

  public static async find(
    plotId: number
  ): Promise<Plot | null> {
    return await prismaClient.plot
      .findUnique({
        where: { id: plotId },
      });
  }

  public static async store(data: Prisma.PlotCreateInput): Promise<Plot> {
    return await prismaClient.plot
      .create({ data });
  }

  public static async update(id: number, data: Prisma.PlotUpdateInput): Promise<Plot> {
    return await prismaClient.plot
      .update({
        where: {
          id: id
        },
        data: data
      });
  }
}
