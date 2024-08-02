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
} from "../../../data-access/auth/signup";
import { SqlError } from "../../../support/utils/errorHandler";
// import { DeployedItem } from "../../../types";

// 🧠 Brain
//
// 🎯 TODO:



const db = new DbConnection();
// db.connectToDB();

async function handler(event: APIGatewayProxyEvent, context: Context) {
  console.log("Starting signup");

  // Validate body
  let body: unknown = !event.body ? {} : JSON.parse(event.body);

  console.log("body");
  console.log(body);

  const { success, data, errors } = signupCheckerValidation(body);

  if (!success || !data) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        msg: "Validation errors",
        errorMsgs: errors,
      }),
    };
  }

  let userAccs: GetUserLogins;
  if ( data.accountType === 'google') {
    const googleData = await verifyGoogleToken(data.credential!)
    if (!googleData.payload) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          msg: "Validation errors",
          errorMsgs: {
            google: 'Cannot validate google account. Please retry'
          },
        }),
      };
    }

    try {
      const userAccs = await getAccountByGoogleId(googleData.payload?.sub)
      
    } catch (err) {
      if (err instanceof SqlError) {
        console.log (err)
        return {
          statusCode: 500,
          body: JSON.stringify({
            msg: "Internal database server error",
            errorMsgs: {
              google: 'Issue with the database. Please try again.'
            },
          }),
        };
      }
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: "Internal server error",
          errorMsgs: {
            google: 'Issue authenticating google account (0001). Please try again.'
          },
        }),
      };
    }

  } else  if ( data.accountType === 'email' ) {
    try {
      userAccs = await getAccountByEmail(data.email!)
      
    } catch (err) {
      if (err instanceof SqlError) {
        console.log (err)
        return {
          statusCode: 500,
          body: JSON.stringify({
            msg: "Internal database server error",
            errorMsgs: {
              google: 'Issue with the database. Please try again.'
            },
          }),
        };
      }
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: "Internal server error",
          errorMsgs: {
            google: 'Issue authenticating google account (0001). Please try again.'
          },
        }),
      };
    }

  } else {
    return {
      statusCode: 422,
      body: JSON.stringify({
        msg: "Validation errors",
        errorMsgs: {
          accountType: ['Please enter a valid accountType.']
        },
      }),
    };

  }

  // const googleData = (data.accountType === "google" ? await verifyGoogleToken(data.credential!) : null)
  // if (googleData?.payload === null) {
  //   return {
  //     statusCode: 422,
  //     body: JSON.stringify({
  //       msg: "Validation errors",
  //       errorMsgs: data,
  //     }),
  //   };

  // }

  // const userAccs = ( data.accountType === "google" ? await getAccountByGoogleId(googleData.payload?.sub) : await getAccountByEmail(data.email!) )


//   if (err instanceof SqlError) {
//     console.log("Sql Error founf +++++++++++++++++++++++++++++++++++++++");
//   }
//   console.log("ERROR ++++++");
//   console.log(err);
// }



  if ( userAccs.)

  verify

  if ( data.accountType === 'google') {

    

  } else if ( data.accountType === 'email' ) {

  } else {

    // Return 422 account type not found
  }

  // const googleData = (data.accountType === "google" ? await verifyGoogleToken(data.credential!) : null)

  // Return Error Message


  // console.log("Truncate table");
  // await truncateTable();

  // console.log("create account");
  // const c1 = await createAccount("dave@harmonydata.co.uk");
  // console.log("c1");
  // console.log(c1);

  // console.log("create account");
  // const c2 = await createAccount("guy@harmonydata.co.uk");
  // console.log("c2");
  // console.log(c2);

  // console.log("create account");
  // const c3 = await createAccount("cameron@harmonydata.co.uk");
  // console.log("c3");
  // console.log(c3);

  // console.log("create account");
  // const c4 = await createAccount("vickie@harmonydata.co.uk");
  // console.log("c4");
  // console.log(c4);

  // console.log("email");
  // console.log("Email doesnt exist");
  // const retrieveAccount = await getAccountByEmail(data.email as string);
  // console.log("getAccountByEmail ----------------------");
  // console.log(retrieveAccount);

  // console.log("get all account");
  // const allAccs = await getAllAccounts();
  // console.log("allAccs");
  // console.log(allAccs);

  // console.log("get all account");
  // const upd = await updateAccount(1, false);
  // console.log("upd");
  // console.log(upd);

  // console.log("get all account");
  // const del = await deleteAllAccounts();
  // console.log("del");
  // console.log(del);

  // // If google then verify google account
  // const googleData = (data.accountType === "google" ? await verifyGoogleToken(data.credential!) : null)

  // if (!googleData || googleData.errorMsg || !googleData.payload) {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({
  //       msg: "Error verifying google account",
  //       errorMsgs: googleData.errorMsg
  //         ? googleData.errorMsg
  //         : "Issue authenticating google credentials.",
  //     }),
  //   };
  // }

  // //
  // const usersAccount = ( data.accountType === "google" ? await getAccountByGoogleId(googleData.payload?.sub) : await getAccountByEmail(data.email!) )

  // // usersAccount.noRows ...

  // // If google account decipher google credential
  // if (data.accountType === "google" && data.credential) {
  //   console.log("1 - Google check");
  //   /**
  //    * 1. Verify google credentials sent to us - returns user structure form google
  //    *
  //    * 2. Check if google id is verified
  //    *
  //    * 3. If Google account verified - return 200 with JWT token to login in
  //    *
  //    * 4. If google account does not exist then write it
  //    *    2.1
  //    *    2.2 If verified then return 200
  //    */
  //   const googleData = await verifyGoogleToken(data.credential);
  //   console.log("googleData");
  //   console.log(googleData);

  //   if (!googleData || googleData.errorMsg || !googleData.payload) {
  //     return {
  //       statusCode: 500,
  //       body: JSON.stringify({
  //         msg: "Error verifying google account",
  //         errorMsgs: googleData.errorMsg
  //           ? googleData.errorMsg
  //           : "Issue authenticating google credentials.",
  //       }),
  //     };
  //   }

  //   // Retrieve google account if it already exists
  //   const googleAccount = getAccountByGoogleId(googleData.payload?.sub);

  //   console.log("5 - Starting signup");
  //   console.log(googleData);

  //   return {
  //     statusCode: 201,
  //     body: JSON.stringify({
  //       msg: "Great job",
  //     }),
  //   };

  //   // // Return an error if above fails
  //   // // May need to add test
  //   // if (!googleData.payload) {
  //   //   console.log("6 - Starting signup");
  //   //   // 🎯 TODO: Create the return
  //   //   return;
  //   // }

  //   // // 🎯 TODO: getAccountByGoogleId needs to be changed to return a record and not an array
  //   // const retrieveAccount = await getAccountByGoogleId(googleData.payload.iss);
  //   // console.log("7 - Starting signup");
  //   // // 🎯 TODO: Should only return one row

  //   // // if (retrieveAccount.length === 1 && retrieveAccount[0].validated) {
  //   // //   // Account already exists

  //   // //   // Create JWT

  //   // //   // Return that the user is logged on as this is google
  //   // //   return;
  //   // // } else if (retrieveAccount.length === 1 && !retrieveAccount[0].validated) {
  //   // //   // Update login info

  //   // //   // Create token

  //   // //   // return
  //   // //   return;
  //   // // } else {
  //   // //   // Insert login info
  //   // //   // Create token
  //   // //   // return
  //   // // }
  // } else if (data.accountType === "email") {
  //   console.log("Truncate table");
  //   await truncateTable();

  //   console.log("email");
  //   console.log("Email doesnt exist");
  //   const retrieveAccount = await getAccountByEmail(data.email as string);

  //   console.log("get all account");
  //   await getAllAccounts();

  //   console.log("create account");
  //   await createAccount("dave@harmonydata.co.uk");

  //   console.log("check emai account");
  //   await getAccountByEmail(data.email as string);

  //   console.log("update account");
  //   await updateAccount(1, false);

  //   console.log("get all account");
  //   await getAllAccounts();

  //   console.log("update account");
  //   await updateAccount(1, false);

  //   console.log("get all account");
  //   await getAllAccounts();

  //   console.log("create another account");
  //   await createAccount("vickie@harmonydata.co.uk");

  //   console.log("get all account");
  //   await getAllAccounts();

  //   // If account validated return error

  //   // if account not validated
  //   // bcrypt the password
  //   // update the login
  //   // return token

  //   // if no account returned
  //   // bcrypt the password
  //   // insert user login
  //   // return token
  // } else {
  //   // Look into what errors and return the error
  //   return;
  // }

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
