import { z } from "zod";
import prismaClient from "../database";

export const ZoneStoreValidator =
  z.object({
    name: z.string().refine(async (name) => {
      const zone = await prismaClient.zone.findUnique({
        where: { name: name }
      });

      return zone == null;
    }),
    companyId: z.string().refine(async (companyId) => {
      const company = await prismaClient.company.findUnique({
        where: { id: companyId }
      });

      return company != null;
    }),
  });

export const ZoneUpdateValidator =
  z.object({
    id: z.number().refine(async (id) => {
      const zone = await prismaClient.zone.findUnique({
        where: { id: Number(id) }
      });

      return zone != null;
    }),
    name: z.string().optional(),
  });
