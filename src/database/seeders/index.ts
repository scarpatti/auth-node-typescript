import prismaClient from "..";
import runPermissions from "./permissions";
import runPermissionTypes from "./permissionTypes";
import runRoles from "./roles";
import runRoleTypes from "./roleTypes";

async function main() {
  try {
    prismaClient.$transaction(async (tx) => {
      const permissionTypes = await runPermissionTypes(tx);
      await runPermissions(tx, permissionTypes);

      const roleTypes = await runRoleTypes(tx);
      await runRoles(tx, roleTypes);
    }, {
      maxWait: 30000,
      timeout: 60000
    });


  } catch(error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prismaClient.$disconnect();

    process.exit(1);
  });
