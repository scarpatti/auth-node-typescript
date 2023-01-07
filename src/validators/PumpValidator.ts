import { PumpType } from "@prisma/client";
import { z } from "zod";
import prismaClient from "../database";

export const PumpStoreValidator =
  z.object({
    type: z.nativeEnum(PumpType),
    deviceCode: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    fleet: z.string(),
    model: z.string(),
    power: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    companyId: z.string().refine(async (companyId) => {
      const company = await prismaClient.company.findUnique({
        where: { id: companyId }
      });

      return company != null;
    }),
  });

export const PumpUpdateValidator =
  z.object({
    type: z.nativeEnum(PumpType).optional(),
    deviceCode: z.union([z.string(), z.number()]).transform((val) => Number(val)).optional(),
    fleet: z.string().optional(),
    model: z.string().optional(),
    power: z.union([z.string(), z.number()]).transform((val) => Number(val)).optional(),
  });
