// lambda/index.ts
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";

async function handler(event: APIGatewayProxyEvent, context: Context) {

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    body: JSON.stringify(`Hello from lambda 14`),
  };

  console.log (response)

  return response;
}

export { handler };