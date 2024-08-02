import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { verifyGoogleToken } from "../../../support/helpers/verify-google-token";
import { DbConnection } from "../../../foundation/db/db-utils";
import { registerCompleteValidation } from "../../../schemas/auth/registration-validate";
import {
  getAccountByGoogleId,
  getAccountByEmail,
  createAccount,
  updateAccount,
  GetUserLogins,
  truncateTable,
  setRegisterComplete,
} from "../../../data-access/auth/signup";
import {
  createToken,
  comparePasswords,
  hashPassword,
  decipherToken,
} from "../../../support/utils/tokens"; // "../../../support/utils/tokens";
import { ApiResponseError } from "../../../support/errors/errorHandler";

type SignupToken = {
  userId: number;
};

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
    const validatedData = registerCompleteValidation(body);

    // Decipher token
    const tokenDets = decipherToken<SignupToken>(
      validatedData.token,
      process.env.JWT_SECRET!,
    );

    // Create email verification token
    const verifyToken: string | null = null;

    if (!validatedData.emailVerify) {
      console.log("Validate account");
      // 🎯 TODO: Create verify token
    }

    // Add the user details to the database, save verify token
    await setRegisterComplete(tokenDets.userId, verifyToken, validatedData);

    // 🎯 TODO: Return the ApiResponse

    // // If google signup check, verify the google credential sent to us
    // let userAccs: GetUserLogins;
    // if (validateData.accountType === "google") {
    //   googleData = await verifyGoogleToken(validateData.credential!);
    //   console.log("Google Data");
    //   console.log(googleData);
    //   if (!googleData.email_verified) {
    //     response.statusCode = 401;
    //     response.body = JSON.stringify({
    //       msg: "Validation errors",
    //       errorMsgs: {
    //         google: ["Please verify your email in google to continue."],
    //       },
    //     });
    //     return response;
    //   }

    //   // Retrieve google account if already used
    //   userAccs = await getAccountByGoogleId(googleData.sub);
    // } else if (validateData.accountType === "email") {
    //   // Retrieve email account if already used
    //   userAccs = await getAccountByEmail(validateData.email!);
    // } else {
    //   response.statusCode = 422;
    //   response.body = JSON.stringify({
    //     msg: "Validation errors",
    //     errorMsgs: {
    //       accountType: ["Please enter a valid accountType."],
    //     },
    //   });
    //   return response;
    // }

    // console.log("UserAccs");
    // console.log(userAccs);

    // const email =
    //   validateData.accountType === "email" ? `'${validateData.email}'` : "null";
    // const googleId =
    //   validateData.accountType === "google" ? `'${googleData?.sub}'` : "null";
    // const googleEmail =
    //   validateData.accountType === "google" ? `'${googleData?.email}'` : "null";

    // console.log(validateData.password);
    // console.log(`hello 123`);

    // let hashedPwd: string | null = "";
    // if (validateData.password && validateData.password.length > 0) {
    //   const pwd1 = validateData.password;
    //   console.log("Password");
    //   console.log(pwd1);
    //   console.log("HERE ++++1");
    //   hashedPwd = await hashPassword(pwd1);
    //   console.log("HERE ++++2");
    //   console.log("hash 4", hashedPwd);
    // }

    // // const salt = await genSalt(10);
    // console.log("Here I am 126");
    // // const hashedPwd =
    // //   validateData.accountType === "google"
    // //     ? "null"
    // //     : await hash(validateData.password!, salt); // await hashPassword(validateData.password!);
    // // const hashedPwd = await hash(password, salt);

    // // const hashedPwd =
    // //   validateData.accountType === "google"
    // //     ? "null"
    // //     : await hashPassword(validateData.password!);
    // // : `'${await hashPassword(validateData.password!)}`;
    // console.log(`hello 124`);
    // console.log(hashedPwd);
    // console.log(email);
    // console.log(googleId);

    // console.log(`email       : ${email}`);
    // console.log(`googleId    : ${googleId}`);
    // console.log(`googleEmail : ${googleEmail}`);
    // //
    // if (userAccs.rows === 0) {
    //   console.log("Here 20");
    //   // Create account
    //   const createdAcc = await createAccount(
    //     validateData.accountType === "google",
    //     email,
    //     validateData.accountType === "google" ? null : hashedPwd,
    //     googleId,
    //     googleEmail,
    //   );

    //   console.log("Here 21");
    //   console.log(createdAcc);
    //   // Create token for user id
    //   const token = createToken(
    //     {
    //       userId: createdAcc.insertId,
    //     },
    //     process.env.JWT_SECRET!,
    //     "60m",
    //   );

    //   console.log("Here 22");
    //   response.statusCode = 201;
    //   console.log("Here 23");
    //   console.log(
    //     validateData.accountType === "google" ? googleData?.given_name : "",
    //   );
    //   console.log("Here 24");
    //   console.log(
    //     validateData.accountType === "google" ? googleData?.family_name : "",
    //   );
    //   console.log("Here 25");
    //   response.body = JSON.stringify({
    //     msg: "Account created",
    //     token,
    //     firstName:
    //       validateData.accountType === "google" ? googleData?.given_name : "",
    //     lastName:
    //       validateData.accountType === "google" ? googleData?.family_name : "",
    //     preferredName:
    //       validateData.accountType === "google" ? googleData?.name : "",
    //   });
    //   console.log(response);
    //   return response;

    //   // Return successful code
    // } else if (userAccs.rows > 1) {
    //   console.log("Here 23");
    //   throw new ApiResponseError(
    //     "500",
    //     "Duplicate accounts",
    //     JSON.stringify({
    //       message: "Duplicate accounts",
    //       errorMsgs: {
    //         message: `Duplicate accounts retrieved. Notify support quoting ${validateData.accountType === "google" ? googleData?.sub : validateData.email}.`,
    //       },
    //     }),
    //   );
    // } else {
    //   // A record for the user already exists
    //   // Not validated
    //   console.log("Here 24");
    //   if (!userAccs.userAccs[0].validated) {
    //     console.log("Here 25");

    //     // Update login details
    //     const createdAcc = await updateAccount(
    //       userAccs.userAccs[0].userId,
    //       validateData.accountType === "google",
    //       email,
    //       hashedPwd,
    //       googleId,
    //       googleEmail,
    //     );

    //     console.log("Here 26");

    //     // Create token for user id
    //     const token = createToken(
    //       {
    //         userId: userAccs.userAccs[0].userId,
    //       },
    //       process.env.JWT_SECRET!,
    //       "60m",
    //     );

    //     response.statusCode = 201;
    //     response.body = JSON.stringify({
    //       msg: "Account created",
    //       token,
    //       firstName:
    //         validateData.accountType === "google" ? googleData?.given_name : "",
    //       lastName:
    //         validateData.accountType === "google"
    //           ? googleData?.family_name
    //           : "",
    //       preferredName:
    //         validateData.accountType === "google" ? googleData?.name : "",
    //     });
    //     return response;
    //   } else {
    //     console.log("Here 30");

    //     // If google and verified then log user on
    //     if (
    //       validateData.accountType === "google" &&
    //       userAccs.userAccs[0].validated
    //     ) {
    //       console.log("Here 31");
    //       const { tutorAcc, studentAcc, parentAcc, adminAcc } =
    //         userAccs.userAccs[0];
    //       const accType =
    //         (tutorAcc ? 2 : 0) +
    //         (studentAcc ? 8 : 0) +
    //         (parentAcc ? 32 : 0) +
    //         (adminAcc ? 64 : 0);

    //       const payload = {
    //         userId: userAccs.userAccs[0].userId,
    //         accountType: accType,
    //         access: "T",
    //       };
    //       console.log("Here 32");

    //       const accessToken = createToken(
    //         payload,
    //         process.env.JWT_SECRET!,
    //         "48h",
    //       );
    //       const refreshToken = createToken(
    //         payload,
    //         process.env.JWT_REFRESH_SECRET!,
    //         "48h",
    //       );

    //       // Add to header
    //       console.log("Here 33");

    //       response["multiValueHeaders"] = {
    //         "Set-Cookie": [
    //           `refreshToken=${refreshToken}; Path=/; HttpOnly;`,
    //           `accessToken=${accessToken}; Path=/; HttpOnly;`,
    //         ],
    //       };

    //       // Return 308 - Permanently redirect
    //       response.statusCode = 308;
    //       response.body = JSON.stringify({
    //         msg: "Successfully signed in",
    //         userId: userAccs.userAccs[0].userId,
    //         accountType: accType,
    //       });
    //       return response;
    //     } else {
    //       console.log("Here 40");

    //       // NEED TO WORK THIS OUT.
    //       // Either email accounts or unvalidated google accounts
    //       // ACTUALLY DO WE WANT
    //       // else if google unvaklidated
    //       // else if email

    //       // Check password
    //       console.log("Here 41");

    //       const matched = await comparePasswords(
    //         validateData.password!,
    //         userAccs.userAccs[0].password!,
    //       );

    //       console.log("Here 42");
    //       if (matched) {
    //         console.log("Matched !!!!");
    //         const { tutorAcc, studentAcc, parentAcc, adminAcc } =
    //           userAccs.userAccs[0];
    //         const accType =
    //           (tutorAcc ? 2 : 0) +
    //           (studentAcc ? 8 : 0) +
    //           (parentAcc ? 32 : 0) +
    //           (adminAcc ? 64 : 0);

    //         const payload = {
    //           userId: userAccs.userAccs[0].userId,
    //           accountType: accType,
    //           access: "T",
    //         };
    //         const accessToken = createToken(
    //           payload,
    //           process.env.JWT_SECRET!,
    //           "48h",
    //         );
    //         const refreshToken = createToken(
    //           payload,
    //           process.env.JWT_REFRESH_SECRET!,
    //           "48h",
    //         );

    //         // Add to header
    //         response["multiValueHeaders"] = {
    //           "Set-Cookie": [
    //             `refreshToken=${refreshToken}; Path=/; HttpOnly;`,
    //             `accessToken=${accessToken}; Path=/; HttpOnly;`,
    //           ],
    //         };

    //         // Return 308 - Permanently redirect
    //         response.statusCode = 308;
    //         response.body = JSON.stringify({
    //           msg: "Successfully signed in",
    //           userId: userAccs.userAccs[0].userId,
    //           accountType: accType,
    //         });
    //         return response;
    //       } else {
    //         console.log("Here 43");

    //         throw new ApiResponseError(
    //           "401",
    //           "Account exists",
    //           JSON.stringify({
    //             message: "Account exists",
    //             errorMsgs: {
    //               message: `Account already exists. If this is your account please reset password.`,
    //             },
    //           }),
    //         );
    //       }
    //     }
    //   }
    // }
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
