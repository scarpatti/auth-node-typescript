import { Prisma, Role, RoleType } from "@prisma/client";
import permissionPermissions from "./Concerns/definesPermissionPermissions";
import userPermissions from "./Concerns/definesUserPermissions";

const permissionsMap = (permissions: any) => {
  return permissions.map((permission: any) => {
    return {
      slug: permission.slug
    }
  });
}
export async function runRoles(tx: Prisma.TransactionClient, roleTypes: RoleType[]): Promise<Role[]> {
  const roles = [
    {
      name: 'Super administrador',
      description: 'Perfil que inicialmente possui todas as permissões do sistema',
      roleTypeId: 'Super administrador',
      permissions: {
        connect: [
          ...permissionsMap(permissionPermissions),
          ...permissionsMap(userPermissions)
        ]
      }
    },
    {
      name: 'Administrador',
      description: 'Perfil que possui permissões de administrador',
      roleTypeId: 'Administrador',
      permissions: {
        connect: [
          ...permissionsMap(userPermissions)
        ]
      }
    },
    {
      name: 'Usuário Padrão',
      description: 'Perfil que possui permissões de usuário comum',
      roleTypeId: 'Usuário Padrão',
      permissions: {
        connect: [
          {
            slug: 'list-users'
          },
          {
            slug: 'show-users'
          }
        ]
      }
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
