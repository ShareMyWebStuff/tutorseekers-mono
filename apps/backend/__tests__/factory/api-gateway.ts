import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { APIGatewayProxyEvent } from "aws-lambda";

export const apiGatewayProxyEventFactory = Factory.define<APIGatewayProxyEvent>(
  // eslint-disable-next-line no-empty-pattern
  ({}) => ({
    body: '{ "message": "success"}',
    headers: {},
    httpMethod: "GET",
    isBase64Encoded: false,
    multiValueHeaders: {},
    multiValueQueryStringParameters: {},
    path: "",
    pathParameters: {},
    requestContext: {
      accountId: "",
      apiId: "",
      authorizer: {},
      httpMethod: "GET",
      identity: {
        accessKey: null,
        accountId: null,
        apiKey: null,
        apiKeyId: null,
        caller: null,
        clientCert: null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType: null,
        cognitoIdentityId: null,
        cognitoIdentityPoolId: null,
        principalOrgId: null,
        sourceIp: "",
        user: null,
        userAgent: null,
        userArn: null,
      },
      path: "",
      protocol: "",
      requestId: faker.string.uuid(),
      requestTimeEpoch: 1010101010,
      resourceId: "",
      resourcePath: "",
      stage: "",
    },
    resource: "",
    stageVariables: null,
    queryStringParameters: {},
  }),
);
