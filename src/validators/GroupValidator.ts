import { z } from "zod";
import prismaClient from "../database";

export const GroupStoreValidator =
  z.object({
    code: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    pumpId: z.union([z.string(), z.number()]).transform((val) => Number(val)).refine(async (id) => {
      const pump = await prismaClient.pump.findUnique({
        include: {
          Group: true
        },
        where: { id: id }
      });

      return pump != null && !pump.Group;
    }),
    reelId: z.union([z.string(), z.number()]).transform((val) => Number(val)).refine(async (id) => {
      const reel = await prismaClient.reel.findUnique({
        include: {
          Group: true
        },
        where: { id: id }
      });

      return reel != null && !reel.Group;
    }),
    cartId: z.union([z.string(), z.number()]).transform((val) => Number(val)).refine(async (id) => {
      const cart = await prismaClient.cart.findUnique({
        include: {
          Group: true
        },
        where: { id: id }
      });

      return cart != null && !cart.Group;
    }),
    companyId: z.string().refine(async (companyId) => {
      const company = await prismaClient.company.findUnique({
        where: { id: companyId }
      });

      return company != null;
    }),
  });

export const GroupUpdateValidator =
  z.object({
    code: z.union([z.string(), z.number()]).transform((val) => Number(val)).optional(),
    pumpId: z.union([z.string(), z.number()]).transform((val) => Number(val)).refine(async (id) => {
      const pump = await prismaClient.pump.findUnique({
        where: { id: id }
      });

      return pump != null;
    }).optional(),
    reelId: z.union([z.string(), z.number()]).transform((val) => Number(val)).refine(async (id) => {
      const reel = await prismaClient.reel.findUnique({
        where: { id: id },
      });

      return reel != null;
    }).optional(),
    cartId: z.union([z.string(), z.number()]).transform((val) => Number(val)).refine(async (id) => {
      const cart = await prismaClient.cart.findUnique({
        where: { id: id }
      });

      return cart != null;
    }).optional(),
  });
