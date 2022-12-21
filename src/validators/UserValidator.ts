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
    password: z.string()
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
