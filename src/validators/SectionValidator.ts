import { z } from "zod";
import prismaClient from "../database";

export const SectionStoreValidator =
  z.object({
    name: z.string().refine(async (name) => {
      const section = await prismaClient.section.findUnique({
        where: { name: name }
      });

      return section == null;
    }),
    companyId: z.string().refine(async (companyId) => {
      const company = await prismaClient.company.findUnique({
        where: { id: companyId }
      });

      return company != null;
    }),
  });

export const SectionUpdateValidator =
  z.object({
    id: z.number().refine(async (id) => {
      const section = await prismaClient.section.findUnique({
        where: { id: Number(id) }
      });

      return section != null;
    }),
    name: z.string().optional(),
  });
