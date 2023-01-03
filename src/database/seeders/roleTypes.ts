import { Prisma, RoleType } from "@prisma/client";

export function runRoleTypes(tx: Prisma.TransactionClient): Promise<RoleType[]> {
  const roleTypes = [
    {
      name: 'Administrador',
      description: 'Perfil que inicialmente possui permissões de administrador'
    },
    {
      name: 'Usuário Padrão',
      description: 'Perfil que inicialmente possui permissões de usuário comum'
    }
  ];

  const result = roleTypes.map(async (roleType) => {
    return await tx.roleType.upsert({
      where: {
        name: roleType.name
      },
      update: roleType,
      create: roleType
    });
  })

  return Promise.all(result);
}

export default runRoleTypes;
