import { Role } from "@prisma/client";
import prismaClient from "../database";

export default class RoleRepository {
  public static async findAll(request: any, where: any = {}): Promise<Role[] | null> {
    return await request.paginate(
      prismaClient.role,
      where
    );
  }

  public static async findByRoleTypeName(roleTypeName: string): Promise<Role | null> {
    return await prismaClient.role
      .findFirst({
        where: {
          RoleType: {
            name: roleTypeName
           },
        }
      });
  }
}
