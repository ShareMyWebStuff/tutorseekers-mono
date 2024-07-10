import nock from "nock";
import { apiGatewayProxyEventFactory } from "../../../factory/api-gateway";
import { lambdaContextFactory } from "../../../factory/lambda-context";
import { handler } from "../../../../src/service/api/auth/signup-checker";

/**
 * Tests
 *
 * 1. Success
 *   google no record exists
 *     add to database
 *     return 201
 *     return token where added to database
 *
 *   email / password
 *     add to
 *
 * 2. Invalid Payload
 *   no accountType
 *   invalid accountType
 *
 */

describe("signup-checker", () => {
  afterAll((): void => {
    jest.clearAllMocks();
  });

  beforeEach((): void => {
    nock.disableNetConnect();
    nock.cleanAll();
  });

  afterEach((): void => {
    nock.enableNetConnect();
    nock.cleanAll();
  });

  describe("When a successful signup-check is receieve", () => {
    let response: { statusCode: number };

    beforeEach(async () => {
      const event = apiGatewayProxyEventFactory.build({
        body: JSON.stringify({
          accountType: "email",
          email: "jonh@example.com",
          password: "Sausages01!",
          credential: undefined,
        }),
      });

      const context = lambdaContextFactory.build();

      nock("https://ssm.eu-west-1.amazonaws.com:443")
        .post("/")
        .reply(200, {
          Parameter: {
            Name: "TESTER",
            Value: "/test",
          },
        });

      response = await handler(event, context);
      console.log("Response");
      console.log(response);
    });

    test("Then statusCode is 201", () => {
      expect(response.statusCode).toBe(201);
    });
  });
});
