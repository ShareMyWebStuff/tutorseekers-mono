import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { verifyGoogleToken } from "../../../support/helpers/verify-google-token";
import { DbConnection } from "../../../foundation/db/db-utils";
import { signupCheckerValidation } from "../../../schemas/auth/signup-checker-validate";
import {
  getAccountByGoogleId,
  getAccountByEmail,
  createAccount,
  updateAccount,
  GetUserLogins,
} from "../../../data-access/auth/signup";
import {
  createToken,
  comparePasswords,
  hashPassword,
} from "../../../support/utils/tokens";
import { ApiResponseError } from "../../../support/errors/errorHandler";

// 🧠 Brain
//
// 🎯 TODO:

const db = new DbConnection();
// db.connectToDB();

async function handler(event: APIGatewayProxyEvent, context: Context) {
  let googleData;
  let response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": process.env.CORSSERVER!,
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    body: JSON.stringify({}),
  };

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
        response.statusCode = 401;
        response.body = JSON.stringify({
          msg: "Validation errors",
          errorMsgs: {
            google: ["Please verify your email in google to continue."],
          },
        });
        return response;
      }

      // Retrieve google account if already used
      userAccs = await getAccountByGoogleId(googleData.sub);
    } else if (validateData.accountType === "email") {
      // Retrieve email account if already used
      userAccs = await getAccountByEmail(validateData.email!);
    } else {
      response.statusCode = 422;
      response.body = JSON.stringify({
        msg: "Validation errors",
        errorMsgs: {
          accountType: ["Please enter a valid accountType."],
        },
      });
      return response;
    }

    console.log("UserAccs");
    console.log(userAccs);

    const email =
      validateData.accountType === "email" ? `'${validateData.email}'` : "null";
    const googleId =
      validateData.accountType === "google" ? `${googleData?.sub}` : "null";
    const googleEmail =
      validateData.accountType === "google" ? `${googleData?.email}` : "null";

    const hashedPwd =
      validateData.accountType === "google"
        ? "null"
        : `'${await hashPassword(validateData.password!)}`;

    console.log(`email       : ${email}`);
    console.log(`googleId    : ${googleId}`);
    console.log(`googleEmail : ${googleEmail}`);
    //
    if (userAccs.rows === 0) {
      // Create account
      const createdAcc = await createAccount(
        validateData.accountType === "google",
        email,
        hashedPwd,
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

      response.statusCode = 201;
      response.body = JSON.stringify({
        msg: "Account created",
        token,
        firstName:
          validateData.accountType === "google" ? googleData?.given_name : "",
        lastName:
          validateData.accountType === "google" ? googleData?.family_name : "",
      });
      return response;

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
      // A record for the user already exists
      // Not validated
      if (!userAccs.userAccs[0].validated) {
        // Update login details
        const createdAcc = await updateAccount(
          userAccs.userAccs[0].userId,
          validateData.accountType === "google",
          email,
          hashedPwd,
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

        response.statusCode = 201;
        response.body = JSON.stringify({
          msg: "Account created",
          token,
          firstName:
            validateData.accountType === "google" ? googleData?.given_name : "",
          lastName:
            validateData.accountType === "google"
              ? googleData?.family_name
              : "",
        });
        return response;
      } else {
        // If google and verified then log user on
        if (
          validateData.accountType === "google" &&
          userAccs.userAccs[0].validated
        ) {
          const { tutorAcc, studentAcc, parentAcc, adminAcc } =
            userAccs.userAccs[0];
          const accType =
            (tutorAcc ? 2 : 0) +
            (studentAcc ? 8 : 0) +
            (parentAcc ? 32 : 0) +
            (adminAcc ? 64 : 0);

          const payload = {
            userId: userAccs.userAccs[0].userId,
            accountType: accType,
            access: "T",
          };
          const accessToken = createToken(
            payload,
            process.env.JWT_SECRET!,
            "48h",
          );
          const refreshToken = createToken(
            payload,
            process.env.JWT_REFRESH_SECRET!,
            "48h",
          );

          // Add to header
          response["multiValueHeaders"] = {
            "Set-Cookie": [
              `refreshToken=${refreshToken}; Path=/; HttpOnly;`,
              `accessToken=${accessToken}; Path=/; HttpOnly;`,
            ],
          };

          // Return 308 - Permanently redirect
          response.statusCode = 308;
          response.body = JSON.stringify({
            msg: "Successfully signed in",
            userId: userAccs.userAccs[0].userId,
            accountType: accType,
          });
          return response;
        } else {
          // NEED TO WORK THIS OUT.
          // Either email accounts or unvalidated google accounts
          // ACTUALLY DO WE WANT
          // else if google unvaklidated
          // else if email

          // Check password
          const matched = await comparePasswords(
            validateData.password!,
            userAccs.userAccs[0].password!,
          );

          if (matched) {
            console.log("Matched !!!!");
            const { tutorAcc, studentAcc, parentAcc, adminAcc } =
              userAccs.userAccs[0];
            const accType =
              (tutorAcc ? 2 : 0) +
              (studentAcc ? 8 : 0) +
              (parentAcc ? 32 : 0) +
              (adminAcc ? 64 : 0);

            const payload = {
              userId: userAccs.userAccs[0].userId,
              accountType: accType,
              access: "T",
            };
            const accessToken = createToken(
              payload,
              process.env.JWT_SECRET!,
              "48h",
            );
            const refreshToken = createToken(
              payload,
              process.env.JWT_REFRESH_SECRET!,
              "48h",
            );

            // Add to header
            response["multiValueHeaders"] = {
              "Set-Cookie": [
                `refreshToken=${refreshToken}; Path=/; HttpOnly;`,
                `accessToken=${accessToken}; Path=/; HttpOnly;`,
              ],
            };

            // Return 308 - Permanently redirect
            response.statusCode = 308;
            response.body = JSON.stringify({
              msg: "Successfully signed in",
              userId: userAccs.userAccs[0].userId,
              accountType: accType,
            });
            return response;
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
