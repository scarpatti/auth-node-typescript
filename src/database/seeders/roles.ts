import { Prisma, RoleType } from "@prisma/client";

export async function runRoles(tx: Prisma.TransactionClient, roleTypes: RoleType[]) {
  const roles = [
    {
      name: 'Administrador',
      description: 'Perfil que possui permissões de administrador',
      roleTypeId: 'Administrador'
    },
    {
      name: 'Usuário Padrão',
      description: 'Perfil que possui permissões de usuário comum',
      roleTypeId: 'Usuário Padrão'
    }
  ];

  const result = roles.map((role) => {
    const roleType = roleTypes.find((roleType) => roleType.name === role.roleTypeId);

    if(!roleType) {
      throw new Error (`Role type not exist: ${role.roleTypeId}`);
    }

    return tx.role.upsert({
      where: {
        name: role.name
      },
      update: {
        ...role,
        roleTypeId: roleType?.id
      },
      create: {
        ...role,
        roleTypeId: roleType?.id
      }
    })
  })

  return Promise.all(result);
}

export default runRoles;
