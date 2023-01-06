import { UserStatus } from "@prisma/client";
import { z } from "zod";
import prismaClient from "../database";

export const UserStoreValidator =
  z.object({
    name: z.string(),
    email: z.string().email().refine(async (email) => {
      const user = await prismaClient.user.findUnique({
        where: { email: email }
      });

      return user == null;
    }),
    roleId: z.union([z.string(), z.number()]).transform((val) => Number(val)).refine(async (roleId) => {
      const role = await prismaClient.role.findUnique({
        where: { id: roleId }
      });

      return role != null;
    }),
    companyId: z.string().refine(async (companyId) => {
      const company = await prismaClient.company.findUnique({
        where: { id: companyId }
      });

      return company != null;
    }),
    password: z.string(),
    status: z.nativeEnum(UserStatus).optional()
  });

export const UserUpdateValidator =
  z.object({
    userId: z.string().refine(async (userId) => {
      const user = await prismaClient.user.findUnique({
        where: { id: userId }
      });

      return user != null;
    }),
    name: z.string().optional(),
    email: z.string().email().optional(),
    roleId: z.union([z.string(), z.number()]).transform((val) => Number(val)).refine(async (roleId) => {
      const role = await prismaClient.role.findUnique({
        where: { id: roleId }
      });

      return role != null;
    }).optional(),
    companyId: z.string().refine(async (companyId) => {
      const company = await prismaClient.company.findUnique({
        where: { id: companyId }
      });

      return company != null;
    }).optional(),
    status: z.nativeEnum(UserStatus).optional()
  });
