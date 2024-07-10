// lambda/index.ts
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { OAuth2Client } from "google-auth-library";
import { sign } from "jsonwebtoken";
import { DbConnection } from "../../../utils/db-utils";
import { z } from "zod";

export interface Credential {
  credential: string;
}

// import * as z from 'zod';
// export const commandRequest = z.object({
//     deviceId: z.string(),
//     tenantId: z.string()
// });
// export type CommandRequest = z.infer<typeof commandRequest>;

// export const update:AsyncProxyHandler = async event => {
//   let json:unknown = JSON.parse(event.body);
//   const command = commandRequest.safeParse(json); //command is of type CommandRequest
//   if (!parsed.success) {
//     console.log(parsed.error);
//     return { statusCode: 500, body: { message: parsed.error }};
//   }
//   return {statusCode: 200};
// }

const GOOGLE_CLIENT_ID =
  "1066373686372-u5ks8n52sc6ffl86o97vsq52lme1maqh.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const db = new DbConnection();

async function handler(event: APIGatewayProxyEvent, context: Context) {
  const verifyGoogleToken = async (token: string) => {
    console.log("verifyGoogleToken");

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });
      return { payload: ticket.getPayload() };
    } catch (error) {
      return { error: "Invalid user detected. Please try again" };
    }
  };

  if (!event.body) {
    console.log("Body not found");
    return {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "Empty request body" }),
    };
  }

  let body: Credential;

  body = JSON.parse(event.body);

  const verificationResponse = await verifyGoogleToken(body.credential);

  if (!verificationResponse) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        googleMessage: "Internal error - please try again",
      }),
    };
  }

  if (verificationResponse.error) {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: verificationResponse.error }),
    };
  }

  const profile = verificationResponse.payload;

  // res.status(201).json({
  //   message: "Signup was successful",
  //   user: {
  //     firstName: profile?.given_name,
  //     lastName: profile?.family_name,
  //     picture: profile?.picture,
  //     email: profile?.email,
  //     token: jwt.sign({ email: profile?.email }, "myScret", {
  //       expiresIn: "1d",
  //     }),
  //   },
  // });

  console.log("Profile");
  console.log(profile);

  return {
    statusCode: 201,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      message: "Signup was successful",
      user: {
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        picture: profile?.picture,
        email: profile?.email,
        token: sign({ email: profile?.email }, "myScret", {
          expiresIn: "1d",
        }),
      },
    }),
  };
}

export { handler };
