import { Section, Prisma } from "@prisma/client";
import prismaClient from "../database";

export default class SectionRepository {
  public static async findAll(request: any): Promise<Section[]  | null> {
    return await request.paginate(
      prismaClient.section,
      {
        where: {
          companyId: request.user.companyId
        }
      },
    );
  }

  public static async find(
    sectionId: number
  ): Promise<Section | null> {
    return await prismaClient.section
      .findUnique({
        where: { id: sectionId },
      });
  }

  public static async store(data: Prisma.SectionCreateInput): Promise<Section> {
    return await prismaClient.section
      .create({ data });
  }

  public static async update(id: number, data: Prisma.SectionUpdateInput): Promise<Section> {
    return await prismaClient.section
      .update({
        where: {
          id: id
        },
        data: data
      });
  }
}
