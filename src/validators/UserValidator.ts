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
    roleId: z.number().refine(async (roleId) => {
      const role = await prismaClient.role.findUnique({
        where: { id: roleId }
      });

      return role != null;
    }),
    password: z.string(),
    status: z.nativeEnum(UserStatus)
  });

export const UserAuthenticateValidator =
  z.object({
    email: z.string().email().refine(async (email) => {
      const user = await prismaClient.user.findUnique({
        where: { email: email }
      });

      return user != null;
    }),
    password: z.string()
  });
