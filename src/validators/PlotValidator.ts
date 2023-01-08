import { z } from "zod";
import prismaClient from "../database";

export const PlotStoreValidator =
  z.object({
    name: z.string().refine(async (name) => {
      const plot = await prismaClient.plot.findUnique({
        where: { name: name }
      });

      return plot == null;
    }),
    companyId: z.string().refine(async (companyId) => {
      const company = await prismaClient.company.findUnique({
        where: { id: companyId }
      });

      return company != null;
    }),
  });

export const PlotUpdateValidator =
  z.object({
    id: z.number().refine(async (id) => {
      const plot = await prismaClient.plot.findUnique({
        where: { id: Number(id) }
      });

      return plot != null;
    }),
    name: z.string().optional(),
  });
