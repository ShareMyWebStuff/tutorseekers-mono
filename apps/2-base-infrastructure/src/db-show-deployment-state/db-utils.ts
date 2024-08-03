import { ResultSetHeader, RowDataPacket, ProcedureCallPacket } from "mysql2";
import { Connection, createConnection } from "mysql2/promise";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { ErrorHandler, SqlError } from "./errorHandler";
import { SqlStatus } from "./types";

export class DbConnection {
  public connection: Connection;
  private readonly __moduleName: "DBController";
  // private connection: mysql.Connection;

  constructor() {}

  public async connectToDB() {
    if (this.connection) {
      return this.connection;
    }

    try {
      // Read secret for database connection
      const client = new SecretsManagerClient({});
      const secret = await client.send(
        new GetSecretValueCommand({
          SecretId: process.env.CLUSTER_SECRET_ARN,
        }),
      );
      const secretValues = JSON.parse(secret.SecretString ?? "{}");

      console.log("Secret");
      console.log(secretValues);

      this.connection = await createConnection({
        host: secretValues.host,
        user: secretValues.username,
        password: secretValues.password,
        database: secretValues.dbname,
        port: parseInt(secretValues.port),
        multipleStatements: true,
      });

      return this.connection;
    } catch (err) {
      console.log("Error connecting to the database", err);
      throw err;
    }
  }

  public async query<
    T extends
      | RowDataPacket[]
      | ResultSetHeader[]
      | RowDataPacket[][]
      | ProcedureCallPacket,
  >(sql: string) {
    // console.log ('Execute ...')
    if (!this.connection) {
      console.log("Connection ...");
      this.connection = await this.connectToDB();
    }

    try {
      console.log("Query ===>", sql);
      const res = await this.connection.query<T>(sql);
      console.log("Query Res ===>", res);

      return res[0];
    } catch (error) {
      // console.log ('Query Error')
      // console.log (error)
      const { message, code, errorno, sqlMessage, sqlState, sql } =
        error as SqlStatus;
      throw new SqlError(message, code, errorno, sqlMessage, sqlState, sql);
    }
  }

  public async execute<
    T extends
      | RowDataPacket[]
      | ResultSetHeader[]
      | RowDataPacket[][]
      | ProcedureCallPacket,
  >(sql: string) {
    // console.log ('Execute ...')
    if (!this.connection) {
      // console.log ('Connection ...')
      this.connection = await this.connectToDB();
    }

    try {
      // console.log ('Execute ===>', sql)
      const res = await this.connection.execute<T>(sql);
      // console.log ('Res')
      // console.log (res)

      return res[0];
    } catch (error) {
      // console.log ('Execute Error')
      // console.log (error)
      const { message, code, errorno, sqlMessage, sqlState, sql } =
        error as SqlStatus;
      throw new SqlError(message, code, errorno, sqlMessage, sqlState, sql);
    }
  }

  // 2023-12-19T22:02:33.325Z	1842fa57-50db-44f9-968b-ce122428b0bf	INFO	{
  //     rows: ResultSetHeader {
  //       fieldCount: 0,
  //       affectedRows: 0,
  //       insertId: 0,
  //       info: '',
  //       serverStatus: 2,
  //       warningStatus: 0,
  //       changedRows: 0
  //     },
  //     fields: undefined
  //   }

  // 2023-12-19T22:19:19.487Z	7df163fe-f87b-483a-80e0-cdaae653bde9	INFO	{
  //     rows: [],
  //     fields: [
  //       `deploy_id` MEDIUMINT UNSIGNED NOT NULL PRIMARY KEY,
  //       `description` VARCHAR(100) NOT NULL,
  //       `filename` VARCHAR(100) NOT NULL,
  //       `status` STRING(4) NOT NULL,
  //       `created_at` TIMESTAMP(19)
  //     ]
  //   }

  public escape(value: string) {
    return this.connection.escape(value);
  }

  //
  // beginTransaction
  //
  public async beginTran() {
    try {
      await this.connection.beginTransaction();
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        !Array.isArray(err) &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        throw new ErrorHandler(
          500,
          err["message"],
          `${this.__moduleName}__BeginTran`,
        );
      } else {
        throw new ErrorHandler(
          500,
          "Database error: starting transaction",
          `${this.__moduleName}__BeginTran`,
        );
      }
    }
  }

  //
  // commitTransaction
  //
  public async commitTran() {
    try {
      await this.connection.commit();
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        !Array.isArray(err) &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        throw new ErrorHandler(
          500,
          err["message"],
          `${this.__moduleName}__CommitTran`,
        );
      } else {
        throw new ErrorHandler(
          500,
          "Database error: commiting transaction",
          `${this.__moduleName}__CommitTran`,
        );
      }
    }
  }

  //
  // rollbackTran
  //
  public async rollbackTran() {
    try {
      await this.connection.rollback();
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        !Array.isArray(err) &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        throw new ErrorHandler(
          500,
          err["message"],
          `${this.__moduleName}__RollbackTran`,
        );
      } else {
        throw new ErrorHandler(
          500,
          "Database error: rolling back transaction",
          `${this.__moduleName}__RollbackTran`,
        );
      }
    }
  }

  // public async runSQL(sql: string) {
  //     if (!this.connection) {
  //         this.connection = await this.connectToDB();
  //     }

  //     return new Promise((resolve, reject) => {
  //         this.connection.query(sql, function (err, results, fields) {
  //             if (err) {
  //                 console.log("ERROR");
  //                 console.log(err);
  //                 reject(err);
  //             } else {
  //                 console.log("RESULTS");
  //                 console.log(results);
  //                 resolve(results);
  //             }
  //         });
  //     });
  // }
}
// let connection: mysql.Connection;

/**
 * Connects to the database defined in the secret
 *
 */
// export const connectToDB = async () => {

//     try {

//         // Read secret for database connection
//         const client = new SecretsManagerClient({});
//         const secret = await client.send(
//             new GetSecretValueCommand({
//                 SecretId: process.env.CLUSTER_SECRET_ARN,
//             }),
//         );
//         const secretValues = JSON.parse(secret.SecretString ?? "{}");
//         console.log(secretValues);

//         console.log("Connect to the database");
//         const connection = mysql.createConnection({
//             host: secretValues.host,
//             user: secretValues.username,
//             password: secretValues.password,
//             database: secretValues.dbname,
//             port: parseInt(secretValues.port),
//             multipleStatements: true,
//         });

//         return connection;

//     } catch (err) {

//         console.log("Error connecting to the database", err);
//         return null;
//     }

// }

// export const executeSQL = async (connection: mysql.Connection, sql: string) => {
//     console.log("Executing SQL");
//     console.log(sql);

//     return new Promise((resolve, reject) => {
//       connection.query(sql, function (err, results, fields) {
//         console.log("Executed SQL 2");
//         if (err) {
//           console.log("ERROR");
//           console.log(err);
//           reject(err);
//         } else {
//           console.log("RESULTS");
//           console.log(results);
//           resolve(results);
//         }
//       });
//     });
// };

// export const runSQL = async (connection: mysql.Connection, sql: string) => {
//     console.log("Executing SQL");
//     console.log(sql);

//     return new Promise((resolve, reject) => {
//         connection.query(sql, function (err, results, fields) {
//             console.log("Executed SQL 2");
//             if (err) {
//             console.log("ERROR");
//             console.log(err);
//             reject(err);
//             } else {
//             console.log("RESULTS");
//             console.log(results);
//             resolve(results);
//             }
//         });
//     });
// };

// const bulkLoad = async (sql: string, params: string[][]) => {
//     console.log("Executing SQL");
//     console.log(sql);

//     return new Promise((resolve, reject) => {
//         connection.query(sql, [params], function (err, results, fields) {
//             console.log("Executed SQL 2");
//             if (err) {
//                 console.log("ERROR");
//                 console.log(err);
//                 reject(err);
//             } else {
//                 console.log("RESULTS");
//                 console.log(results);
//                 resolve(results);
//             }
//         });
//     });
// };
