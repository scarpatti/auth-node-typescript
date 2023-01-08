import { Prisma, Role, RoleType } from "@prisma/client";
import cartPermissions from "./Concerns/definesCartPermission";
import dashboardPermissions from "./Concerns/definesDashboardPermissions";
import groupPermissions from "./Concerns/definesGroupPermissions";
import permissionPermissions from "./Concerns/definesPermissionPermissions";
import plotPermissions from "./Concerns/definesPlotPermissions";
import pumpPermissions from "./Concerns/definesPumpPermissions";
import reelPermissions from "./Concerns/definesReelPermissions";
import sectionPermissions from "./Concerns/definesSectionPermissions";
import userPermissions from "./Concerns/definesUserPermissions";
import zonePermissions from "./Concerns/definesZonePermissions";

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
      Permissions: {
        connect: [
          ...permissionsMap(dashboardPermissions),
          ...permissionsMap(permissionPermissions),
          ...permissionsMap(userPermissions),
          ...permissionsMap(plotPermissions),
          ...permissionsMap(zonePermissions),
          ...permissionsMap(sectionPermissions),
          ...permissionsMap(pumpPermissions),
          ...permissionsMap(reelPermissions),
          ...permissionsMap(cartPermissions),
          ...permissionsMap(groupPermissions),
        ]
      }
    },
    {
      name: 'Administrador',
      description: 'Perfil que possui permissões de administrador',
      roleTypeId: 'Administrador',
      Permissions: {
        connect: [
          ...permissionsMap(dashboardPermissions),
          ...permissionsMap(userPermissions),
          ...permissionsMap(plotPermissions),
          ...permissionsMap(zonePermissions),
          ...permissionsMap(sectionPermissions),
          ...permissionsMap(pumpPermissions),
          ...permissionsMap(reelPermissions),
          ...permissionsMap(cartPermissions),
          ...permissionsMap(groupPermissions),
        ]
      }
    },
    {
      name: 'Usuário Padrão',
      description: 'Perfil que possui permissões de usuário comum',
      roleTypeId: 'Usuário Padrão',
      Permissions: {
        connect: [
          ...permissionsMap(dashboardPermissions),
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
