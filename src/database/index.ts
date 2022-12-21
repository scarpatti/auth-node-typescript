// Setting and starting the database
import { Prisma, PrismaClient } from "@prisma/client";

const logLevel = (
  process.env.NODE_ENV === "dev" && process.env.DEBUG === "true"
    ? ["error", "info", "query", "warn"]
    : ["error"]
) as (Prisma.LogLevel | Prisma.LogDefinition)[];

const databaseURL = (
  process.env.NODE_ENV === "test"
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL
) as string;

const prismaClient = new PrismaClient({
  log: logLevel,
  datasources: {
    db: {
      url: databaseURL,
    },
  },
});

export default prismaClient;

export const handleClearDatabaseBeforeTest = async () => {
  const tables = Prisma.dmmf.datamodel.models
    .map((model) => model.dbName)
    .filter((table) => table);

  return Promise.resolve(
    await prismaClient.$transaction([
      ...tables.map((table) =>
        prismaClient.$executeRaw`TRUNCATE ${table} CASCADE;`
      ),
    ])
  );
};
