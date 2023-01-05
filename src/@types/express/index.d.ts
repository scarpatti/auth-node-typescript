import { Permission, Role, RoleType, User } from "@prisma/client";

declare global {
  namespace Express {
      interface Request{
          user: Omit<User, 'password'> & { Role: Role & { Permissions: Permission[] } & { RoleType: RoleType }}
      }
  }
}
