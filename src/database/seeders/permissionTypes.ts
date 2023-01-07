import { PermissionType, Prisma } from "@prisma/client";

export function runPermissionTypes(tx: Prisma.TransactionClient): Promise<PermissionType[]> {
  const permissionTypes = [
    {
      type: 'Permissions',
      name: 'Permissões',
      description: 'Permissões relacionadas a permissões'
    },
    {
      type: 'Users',
      name: 'Usuários',
      description: 'Permissões relacionadas a usuários'
    },
    {
      type: 'Dashboard',
      name: 'Dashboard',
      description: 'Permissões relacionadas ao dashboard'
    }
  ];

  const result = permissionTypes.map(async (permissionType) => {
    return await tx.permissionType.upsert({
      where: {
        type: permissionType.type
      },
      update: permissionType,
      create: permissionType
    });
  })

  return Promise.all(result);
}

export default runPermissionTypes;
