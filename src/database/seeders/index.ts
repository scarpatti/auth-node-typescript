import prismaClient from "..";
import runPermissions from "./permissions";
import runPermissionTypes from "./permissionTypes";

async function main() {
  try {
    prismaClient.$transaction(async (tx) => {
      const permissionTypes = await runPermissionTypes(tx);
      await runPermissions(tx, permissionTypes);
    }, {timeout: 10000000});


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
