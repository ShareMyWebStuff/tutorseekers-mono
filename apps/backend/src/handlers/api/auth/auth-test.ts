// lambda/index.ts
import {
  APIGatewayProxyEvent,
  Context,
  // APIGatewayProxyResult,
} from "aws-lambda";
// import { OAuth2Client } from "google-auth-library";
// import { sign } from "jsonwebtoken";
import { verifyGoogleToken } from "../../../support/helpers/verify-google-token";
import { DbConnection } from "../../../foundation/db/db-utils";
import { signupCheckerValidation } from "../../../schemas/auth/registration-validate";
import {
  getAccountByGoogleId,
  getAccountByEmail,
  getAllAccounts,
  createAccount,
  updateAccount,
  deleteAllAccounts,
  truncateTable,
  GetUserLogins,
  selectDatabaseDeploy,
} from "../../../data-access/auth/signup";
import { SqlError } from "../../../support/utils/errorHandler";
// import { DeployedItem } from "../../../types";

// 🧠 Brain
//
// 🎯 TODO:

const db = new DbConnection();
// db.connectToDB();

async function handler() {
  try {
    // const trunc = await truncateTable();
    // console.log(trunc);
    const userAccs = await selectDatabaseDeploy();
    console.log(userAccs);
  } catch (err) {
    console.log(err);
  }
}

export { handler };
