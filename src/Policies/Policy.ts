import { Permission } from "@prisma/client";
import { Request } from "express";
import { UnauthorizedExcepition } from "../exceptions/UnauthorizedExcepition";

export default class Policy {
  public static check(request: Request, permissionSlugs: string[]) {
    let countCheck = 0;

    request.user.Role.Permissions?.forEach((permission: Permission) => {
      if(permissionSlugs.includes(permission.slug)) {
        countCheck++;
      }
    })

    if (countCheck < permissionSlugs.length) {
      throw new UnauthorizedExcepition();
    }

    return;
  }
}
