import { Company, Prisma } from "@prisma/client";
import prismaClient from "../database";

export default class CompanyRepository {
  public static async store(data: Prisma.CompanyCreateInput): Promise<Company> {
    return await prismaClient.company
      .create({ data });
  }
}
