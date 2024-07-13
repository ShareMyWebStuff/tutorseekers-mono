// lambda/index.ts
import {
  APIGatewayProxyEvent,
  Context,
  // APIGatewayProxyResult,
} from "aws-lambda";
// import { OAuth2Client } from "google-auth-library";
// import { sign } from "jsonwebtoken";
import { verifyGoogleToken } from "./helpers/verify-google-token";
import { DbConnection } from "../../../utils/db-utils";
import { signupCheckerValidation } from "./helpers/signup-checker-validation";
import {
  getAccountByGoogleId,
  getAccountByEmail,
  getAllAccounts,
  createAccount,
  updateAccount,
  // deleteAllAccounts,
  truncateTable,
  selectError,
} from "../../../models/account";
import { DeployedItem } from "../../../types";

// 🧠 Brain
//
// 🎯 TODO:

// 2024-07-13T10:44:48.776Z	f087e773-b243-4ac1-b8d9-0f748e7c963e	INFO	Error connecting to the database Error: connect ETIMEDOUT
//     at createConnection2 (/var/task/index.js:32904:35)
//     at DbConnection.connectToDB (/var/task/index.js:33257:67)
//     at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
//   code: 'ETIMEDOUT',
//   errno: undefined,
//   sqlState: undefined

const db = new DbConnection();
// db.connectToDB();

async function handler(event: APIGatewayProxyEvent, context: Context) {
  console.log("Starting signup");

  // Validate body
  let body: unknown = !event.body ? {} : JSON.parse(event.body);
  console.log("1 - Starting signup");
  const { success, data } = signupCheckerValidation(body);
  console.log("2 - Starting signup");
  console.log(success);
  console.log(data);

  if (!success) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        msg: "Validation errors",
        errorMsgs: data,
      }),
    };
  }
  console.log("3 - Starting signup");

  // If google account decipher google credential
  if (data.accountType === "google" && data.credential) {
    console.log("4 - Starting signup");
    /**
     * 1. Verify google credentials sent to us - returns user structure form google
     *
     * 2. Check if google id is verified
     *
     * 3. If Google account verified - return 200 with JWT token to login in
     *
     * 4. If google account does not exist then write it
     *    2.1
     *    2.2 If verified then return 200
     */
    const googleData = await verifyGoogleToken(data.credential);

    if (googleData.error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: "Error verifying google account",
          errorMsgs: googleData.error,
        }),
      };
    }

    console.log("5 - Starting signup");
    console.log(googleData);
    // Return an error if above fails
    // May need to add test
    if (!googleData.payload) {
      console.log("6 - Starting signup");
      // 🎯 TODO: Create the return
      return;
    }

    // 🎯 TODO: getAccountByGoogleId needs to be changed to return a record and not an array
    const retrieveAccount = await getAccountByGoogleId(googleData.payload.iss);
    console.log("7 - Starting signup");
    // 🎯 TODO: Should only return one row

    // if (retrieveAccount.length === 1 && retrieveAccount[0].validated) {
    //   // Account already exists

    //   // Create JWT

    //   // Return that the user is logged on as this is google
    //   return;
    // } else if (retrieveAccount.length === 1 && !retrieveAccount[0].validated) {
    //   // Update login info

    //   // Create token

    //   // return
    //   return;
    // } else {
    //   // Insert login info
    //   // Create token
    //   // return
    // }
  } else if (data.accountType === "email") {
    console.log("email");
    console.log("Email doesnt exist");
    const retrieveAccount = await getAccountByEmail(data.email as string);

    console.log("get all account");
    await getAllAccounts();

    console.log("create account");
    await createAccount("dave@harmonydata.co.uk");

    console.log("update account");
    await updateAccount(1, false);

    console.log("get all account");
    await getAllAccounts();

    console.log("update account");
    await updateAccount(1, false);

    console.log("get all account");
    await getAllAccounts();

    console.log("create another account");
    await createAccount("vickie@harmonydata.co.uk");

    console.log("get all account");
    await getAllAccounts();

    console.log("get all account");
    await truncateTable();

    console.log("error");
    await selectError();

    // If account validated return error

    // if account not validated
    // bcrypt the password
    // update the login
    // return token

    // if no account returned
    // bcrypt the password
    // insert user login
    // return token
  } else {
    // Look into what errors and return the error
    return;
  }

  // //
  // const retrieveAccount = getAccountByGoogleId( data.)

  // if (data.accountType === 'google') {

  // } else if ( data.accountType === 'email') {

  // }

  // `SELECT * FROM util_database_deploy ORDER BY deploy_id ASC`,
  // const res = await db.query<DeployedItem[]>(`SELECT * FROM geo_countries`);

  // console.log("res");
  // console.log(res);
  // db.query<DeployedItem[]>(
  //   `SELECT * FROM util_database_deploy ORDER BY deploy_id ASC`,
  // );

  // If google then process google signin
  // if ( data.accountType === 'google') {

  // }
  // const data = "poo";

  return {
    statusCode: 201,
    data: data,
  };

  // If email / password then process email

  // Save login details to database

  // Create JWT

  // Respond with JWT / firstname, lastname

  // const res1 = schema.safeParse(payload);

  // if (!event.body) {
  //   console.log("Body not found");
  //   return {
  //     statusCode: 400,
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({ message: "Empty request body" }),
  //   };
  // }

  // let body: Credential;

  // body = JSON.parse(event.body);

  // const verificationResponse = await verifyGoogleToken(body.credential);

  // if (!verificationResponse) {
  //   return {
  //     statusCode: 500,
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({
  //       googleMessage: "Internal error - please try again",
  //     }),
  //   };
  // }

  // if (verificationResponse.error) {
  //   return {
  //     statusCode: 400,
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({ message: verificationResponse.error }),
  //   };
  // }

  // const profile = verificationResponse.payload;

  // // res.status(201).json({
  // //   message: "Signup was successful",
  // //   user: {
  // //     firstName: profile?.given_name,
  // //     lastName: profile?.family_name,
  // //     picture: profile?.picture,
  // //     email: profile?.email,
  // //     token: jwt.sign({ email: profile?.email }, "myScret", {
  // //       expiresIn: "1d",
  // //     }),
  // //   },
  // // });

  // console.log("Profile");
  // console.log(profile);

  // return {
  //   statusCode: 201,
  //   headers: { "content-type": "application/json" },
  //   body: JSON.stringify({
  //     message: "Signup was successful",
  //     user: {
  //       firstName: profile?.given_name,
  //       lastName: profile?.family_name,
  //       picture: profile?.picture,
  //       email: profile?.email,
  //       token: sign({ email: profile?.email }, "myScret", {
  //         expiresIn: "1d",
  //       }),
  //     },
  //   }),
  // };
}

export { handler };
