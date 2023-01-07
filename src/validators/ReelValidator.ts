import { z } from "zod";
import prismaClient from "../database";

export const ReelStoreValidator =
  z.object({
    deviceCode: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    fleet: z.string(),
    hoseLength: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    hoseDiameter: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    companyId: z.string().refine(async (companyId) => {
      const company = await prismaClient.company.findUnique({
        where: { id: companyId }
      });

      return company != null;
    }),
  });

export const ReelUpdateValidator =
  z.object({
    deviceCode: z.union([z.string(), z.number()]).transform((val) => Number(val)).optional(),
    fleet: z.string().optional(),
    hoseLength: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    hoseDiameter: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  });
