import { PermissionType, Prisma } from "@prisma/client";
import permissionPermissions from "./Concerns/definesPermissionPermissions";
import userPermissions from "./Concerns/definesUserPermissions";

export async function runPermissions(tx: Prisma.TransactionClient, permissionTypes: PermissionType[]) {
  const permissions = [
    ...permissionPermissions,
    ...userPermissions
  ];

  const result = permissions.map((permission) => {
    const permissionType = permissionTypes.find((permissionType) => permissionType.type === permission.permissionTypeId);

    if(!permissionType) {
      throw new Error (`Permission type not exist: ${permission.permissionTypeId}`);
    }

    return tx.permission.upsert({
      where: {
        slug: permission.slug
      },
      update: {
        ...permission,
        permissionTypeId: permissionType?.id
      },
      create: {
        ...permission,
        permissionTypeId: permissionType?.id
      }
    })
  })

  return Promise.all(result);
}

export default runPermissions;
