import {
  APIGatewayProxyEvent,
  Context,
  // APIGatewayProxyResult,
} from "aws-lambda";
import { pooHelper } from "./helpers/poo-helper";
import { weeHelper } from "./helpers/poo-helper";

async function handler(event: APIGatewayProxyEvent, context: Context) {
  console.log("Starting signup");

  const poo = pooHelper();
  const wee = await weeHelper();

  return {
    statusCode: 201,
    // body: poo,
    body: wee,
  };
}

export { handler };
