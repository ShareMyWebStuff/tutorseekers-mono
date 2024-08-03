import { DbConnection } from "./db-utils";
// import { SqlError } from './errorHandler';
// import { ResultSetHeader, RowDataPacket, ProcedureCallPacket } from "mysql2";

const db = new DbConnection();

export const selectUtilDatabaseDeploy = async () => {
  try {
    console.log("Select util_database_deploy");
    const res = await db.query(`SELECT * FROM util_database_deploy;`);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const showDatabaseTables = async () => {
  try {
    console.log("Show tables");
    const res = await db.query(`SHOW TABLES;`);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const showIndexesPerTable = async () => {
  try {
    console.log("Show tables");
    const res = await db.query(
      `SELECT DISTINCT TABLE_NAME, INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS;`,
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export async function main(): Promise<boolean> {
  console.log("Show the Deployment State");
  try {
    await selectUtilDatabaseDeploy();

    await showDatabaseTables();

    await showIndexesPerTable();
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    return false;
  }

  return true;
}
