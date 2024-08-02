// lambda/index.ts
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import {
  createToken,
  comparePasswords,
  hashPassword,
} from "../../support/utils/tokens";
import { signupCheckerValidation } from "../../schemas/auth/registration-validate";

async function handler(event: APIGatewayProxyEvent, context: Context) {
  let body: unknown = !event.body ? {} : JSON.parse(event.body);

  const pwd = "Sybase01!";
  // Validate the payload
  const validateData = signupCheckerValidation(body);

  console.log(validateData);
  console.log("Hash 1");
  console.log("hash 1", await hashPassword("Sausages01!"));
  console.log("Hash 2");
  console.log("hash 2", await hashPassword("Sausages01!"));
  console.log("Hash 3");
  console.log("hash 3", await hashPassword("Sausages01!"));

  let hashedPwd1: string | null = "";
  if (validateData.password && validateData.password.length > 0) {
    const pwd1 = validateData.password;
    console.log(pwd1);
    hashedPwd1 = await hashPassword(pwd1);
    console.log("hash 4", hashedPwd1);
  }

  // console.log("hash 3", await hashPassword("Sausages01!"));
  // console.log("hash 4", await hashPassword("Sausages01!"));

  const hashPwd = "hello"; // await hashPassword(pwd);
  console.log(hashPwd);
  const newPwd = !validateData.password
    ? "Sausages01"
    : validateData.password.toString();

  // const testHash = await hashPassword(newPwd);
  const testHash = "Poo";
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    body: JSON.stringify({
      version: `Version 1.0.1`,
      hash: hashPwd,
      testHash: testHash,
      newPwd,
      validateData: validateData,
      hashedPwd1,
      pwd: {
        validatePwd: validateData.password,
        pwd,
        to: typeof validateData.password,
      },
    }),
  };

  console.log(response);

  return response;
}

export { handler };
