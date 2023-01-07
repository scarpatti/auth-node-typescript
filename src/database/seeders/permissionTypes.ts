import { PermissionType, Prisma } from "@prisma/client";

export function runPermissionTypes(tx: Prisma.TransactionClient): Promise<PermissionType[]> {
  const permissionTypes = [
    {
      type: 'Dashboard',
      name: 'Dashboard',
      description: 'Permissões relacionadas ao dashboard'
    },
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
      type: 'Plots',
      name: 'Talhões',
      description: 'Permissões relacionadas a talhões'
    },
    {
      type: 'Zones',
      name: 'Zonas',
      description: 'Permissões relacionadas à zonas'
    },
    {
      type: 'Sections',
      name: 'Seções',
      description: 'Permissões relacionadas a seções'
    },
    {
      type: 'Pumps',
      name: 'Bombas',
      description: 'Permissões relacionadas à bombas'
    },
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
