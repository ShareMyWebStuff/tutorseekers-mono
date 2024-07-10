import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { APIGatewayProxyEvent } from "aws-lambda";

export type ParsedApiGatewayProxyEvent<T = Record<string, unknown>> = Omit<
  APIGatewayProxyEvent,
  "body"
> & {
  body: T;
};

export const parsedApiGatewayProxyEvent =
  Factory.define<ParsedApiGatewayProxyEvent>(
    ({ transientParams: { offset, limit, sub } }) => ({
      body: {},
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
        authorizer: {
          claims: {
            sub,
          },
        },
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
        requestId: faker.datatype.uuid(),
        requestTimeEpoch: 1010101010,
        resourceId: "",
        resourcePath: "",
        stage: "",
      },
      resource: "",
      stageVariables: null,
      queryStringParameters: {
        offset,
        limit,
      },
    }),
  );
