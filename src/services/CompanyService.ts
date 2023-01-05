import { Company, Prisma } from '@prisma/client';
import CompanyRepository from '../repositories/CompanyRepository';

export default class CompanyService {
  public static async store(data: Prisma.CompanyCreateInput): Promise<Company> {
    return await CompanyRepository.store(data);
  }
}
