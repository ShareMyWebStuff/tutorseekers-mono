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
import { signupCheckerValidation } from "../../../schemas/auth/signup-checker-validate";
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
import { createToken, comparePasswords } from "../../../support/utils/tokens";
import { ApiResponseError } from "../../../support/errors/errorHandler";
// import { DeployedItem } from "../../../types";

// 🧠 Brain
//
// 🎯 TODO:

const db = new DbConnection();
// db.connectToDB();

async function handler(event: APIGatewayProxyEvent, context: Context) {
  let googleData;
  try {
    // Validate body
    let body: unknown = !event.body ? {} : JSON.parse(event.body);

    console.log("body");
    console.log(body);

    // Validate the payload
    const validateData = signupCheckerValidation(body);

    // If google signup check, verify the google credential sent to us
    let userAccs: GetUserLogins;
    if (validateData.accountType === "google") {
      googleData = await verifyGoogleToken(validateData.credential!);
      if (!googleData.email_verified) {
        return {
          statusCode: 401,
          body: JSON.stringify({
            msg: "Validation errors",
            errorMsgs: {
              google: ["Please verify your email in google to continue."],
            },
          }),
        };
      }

      // Retrieve google account if already used
      userAccs = await getAccountByGoogleId(googleData.sub);
    } else if (validateData.accountType === "email") {
      // Retrieve email account if already used
      userAccs = await getAccountByEmail(validateData.email!);
    } else {
      return {
        statusCode: 422,
        body: JSON.stringify({
          msg: "Validation errors",
          errorMsgs: {
            accountType: ["Please enter a valid accountType."],
          },
        }),
      };
    }

    const email =
      validateData.accountType === "email" ? `'${validateData.email}'` : "null";
    const googleId =
      validateData.accountType === "google" ? `${googleData?.sub}` : "null";
    const googleEmail =
      validateData.accountType === "google" ? `${googleData?.email}` : "null";
    //
    if (userAccs.rows === 0) {
      // Create account
      const createdAcc = await createAccount(
        validateData.accountType === "google",
        email,
        googleId,
        googleEmail,
      );

      // Create token for user id
      const token = createToken(
        {
          userId: createdAcc.insertId,
        },
        process.env.JWT_SECRET!,
        "60m",
      );

      return {
        statusCode: 201,
        body: JSON.stringify({
          msg: "Account created",
          token,
          firstName:
            validateData.accountType === "google" ? googleData?.given_name : "",
          lastName:
            validateData.accountType === "google"
              ? googleData?.family_name
              : "",
        }),
      };

      // Return successful code
    } else if (userAccs.rows > 1) {
      throw new ApiResponseError(
        "500",
        "Duplicate accounts",
        JSON.stringify({
          message: "Duplicate accounts",
          errorMsgs: {
            message: `Duplicate accounts retrieved. Notify support quoting ${validateData.accountType === "google" ? googleData?.sub : validateData.email}.`,
          },
        }),
      );
    } else {
      if (!userAccs.userAccs[0].validated) {
        // Update login details
        const createdAcc = await updateAccount(
          userAccs.userAccs[0].userId,
          validateData.accountType === "google",
          email,
          googleId,
          googleEmail,
        );

        // Create token for user id
        const token = createToken(
          {
            userId: userAccs.userAccs[0].userId,
          },
          process.env.JWT_SECRET!,
          "60m",
        );

        return {
          statusCode: 201,
          body: JSON.stringify({
            msg: "Account created",
            token,
            firstName:
              validateData.accountType === "google"
                ? googleData?.given_name
                : "",
            lastName:
              validateData.accountType === "google"
                ? googleData?.family_name
                : "",
          }),
        };
      } else {
        // If google and verified then log user on
        if (
          validateData.accountType === "google" &&
          userAccs.userAccs[0].validated
        ) {
          console.log("STILL TO DO THIS");

          // Create token

          // Add to header

          // Return 308 - Permanently redirect
        } else {
          // Check password
          const matched = await comparePasswords(
            validateData.password!,
            userAccs.userAccs[0].password!,
          );

          if (matched) {
            console.log("Matched !!!!");
            // Set token

            // return 308
          } else {
            throw new ApiResponseError(
              "401",
              "Account exists",
              JSON.stringify({
                message: "Account exists",
                errorMsgs: {
                  message: `Account already exists. If this is your account please reset password.`,
                },
              }),
            );
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
    if (e instanceof ApiResponseError) {
      return {
        statusCode: e.statusCode,
        body: e.body,
      };
    }
    return {
      statusCode: "500",
      body: "Internal server error - please retry",
    };
  }
}

export { handler };
