import { UserStatus } from "@prisma/client";
import { z } from "zod";
import prismaClient from "../database";

export const UserRegisterValidator =
  z.object({
    name: z.string(),
    email: z.string().email().refine(async (email) => {
      const user = await prismaClient.user.findUnique({
        where: { email: email }
      });

      return user == null;
    }),
    password: z.string(),
    companyName: z.string(),
    companyCnpj: z.string().length(14).refine(async (cnpj) => {
      const company = await prismaClient.company.findUnique({
        where: { cnpj: cnpj }
      });

      return company == null;
    })
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
