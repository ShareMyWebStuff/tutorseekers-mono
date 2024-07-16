import nock from "nock";
import { apiGatewayProxyEventFactory } from "../../../factory/api-gateway";
import { lambdaContextFactory } from "../../../factory/lambda-context";
import { handler } from "../../../../src/service/api/auth/signup-checker";
import { DbConnection } from "../../../../src/support/utils/old-db-utils";
import * as vg from "../../../../src/service/api/auth/helpers/verify-google-token"; // "   ./helpers/verify-google-token";
import {} from "../../../../src/models/account";

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

// Mock db connect
jest.mock("../../../../src/utils/db-utils");
// jest.mock("../../../../src/service/api/auth/helpers/verify-google-token");

// jest.mock ("../../../../src/service/api/auth/helpers/verify-google-token", {
//   verifyGoogleToken: jest.fn( () => {

//   })
// })

describe("signup-checker", () => {
  let spy;
  afterAll((): void => {
    jest.clearAllMocks();
  });

  beforeEach((): void => {
    nock.disableNetConnect();
    nock.cleanAll();

    spy = jest.spyOn(vg, "verifyGoogleToken");

    // new DbConnection() .mockClear();
  });

  afterEach((): void => {
    nock.enableNetConnect();
    nock.cleanAll();
  });

  describe("When a successful signup-check is receieve", () => {
    let response: any;

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

      // const spy = jest

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
