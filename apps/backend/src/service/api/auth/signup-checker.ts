// lambda/index.ts
import {
  APIGatewayProxyEvent,
  Context,
  // APIGatewayProxyResult,
} from "aws-lambda";
// import { OAuth2Client } from "google-auth-library";
// import { sign } from "jsonwebtoken";
// import { verifyGoogleToken } from "./helpers/verify-google-token";
import { DbConnection } from "../../../utils/db-utils";
import { signupCheckerValidation } from "./helpers/signup-checker-validation";
import { DeployedItem } from "../../../types";

async function handler(event: APIGatewayProxyEvent, context: Context) {
  // Validate body
  let body: unknown = !event.body ? {} : JSON.parse(event.body);

  console.log("HERE I AM ....");
  const db = new DbConnection();
  console.log("HERE I AM 1 ....");
  db.connectToDB();
  console.log("HERE I AM 2 ....");

  const { success, data } = signupCheckerValidation(body);

  const res = await db.query<DeployedItem[]>(
    `SELECT * FROM util_database_deploy ORDER BY deploy_id ASC`,
  );

  console.log("res");
  console.log(res);

  if (!success) {
    return {
      statusCode: 422,
      msg: "Validation errors",
      errorMsgs: data,
    };
  }

  db.query<DeployedItem[]>(
    `SELECT * FROM util_database_deploy ORDER BY deploy_id ASC`,
  );

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
