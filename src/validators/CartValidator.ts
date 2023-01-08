import { z } from "zod";
import prismaClient from "../database";

export const CartStoreValidator =
  z.object({
    deviceCode: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    fleet: z.string(),
    companyId: z.string().refine(async (companyId) => {
      const company = await prismaClient.company.findUnique({
        where: { id: companyId }
      });

      return company != null;
    }),
  });

export const CartUpdateValidator =
  z.object({
    deviceCode: z.union([z.string(), z.number()]).transform((val) => Number(val)).optional(),
    fleet: z.string().optional(),
  });
