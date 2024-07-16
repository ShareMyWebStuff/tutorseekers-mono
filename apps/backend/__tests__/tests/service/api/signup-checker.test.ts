import nock from "nock";
import { apiGatewayProxyEventFactory } from "../../../factory/api-gateway";
import { lambdaContextFactory } from "../../../factory/lambda-context";
import { handler } from "../../../../src/service/api/auth/signup-checker";
import { DbConnection } from "../../../../src/support/utils/old-db-utils";
import * as vg from "../../../../src/service/api/auth/helpers/verify-google-token"; // "   ./helpers/verify-google-token";
// import {} from "../../../../src/models/account";

/**
 * Tests
 *
 * Google Authentication
 *
 *
 *
 * Email / Password Authentication
 *
 * Verification Issues
 * 1. No accountType
 * 2. Incorrect accountType
 * 3. account type google with no credentials
 * 4. accountType google
 *
 *
 **/

jest.mock("../../../../src/utils/db-utils");

describe("Auth - signup-checker", () => {
  const context = lambdaContextFactory.build();

  beforeAll(() => {
    jest.mock("../../../../src/utils/db-utils");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  // Google testing
  describe("Given we are authenticating using google", () => {
    describe("When a valid google payload is provided", () => {
      describe("And the google account hasnt been added before", () => {
        let res: any;
        let body: any;
        beforeAll(async () => {
          const event = apiGatewayProxyEventFactory.build({
            body: undefined,
          });
          res = await handler(event, context);
          body = JSON.parse(res.body);
        });
        it("Then the status code should be 201", () => {
          expect(res.statusCode).toBe(201);
        });
        it("And the payload should have a token (JWT)", () => {
          expect(body.token).toBeDefined();
        });
        it("And the payload should have the users firstname", () => {
          expect(body.firstname).toBeDefined();
        });
        it("And the payload should have the users lastname", () => {
          expect(body.lastname).toBeDefined();
        });
      });
      describe("And the google account has been added before", () => {
        describe("And the account is not verified", () => {
          it("Then the status code should be 201", () => {
            expect(2).toBe(2);
          });
        });
        describe("And the account is verified", () => {
          it("Then the status code should be 201", () => {
            expect(2).toBe(2);
          });
        });
      });
    });
  });
  describe.skip("Given we are authenticating using email / password", () => {});
  /**
   *
   *
   *
   *
   *
   */
  describe.skip("Given we have an invalid payload", () => {
    describe("When the payload is missing", () => {
      let res: any;
      let body: any;
      beforeAll(async () => {
        const event = apiGatewayProxyEventFactory.build({
          body: undefined,
        });
        res = await handler(event, context);
        body = JSON.parse(res.body);
      });
      it("Then the statuscode should be 422", async () => {
        expect(res.statusCode).toBe(422);
      });
      it("And the msg should be set", async () => {
        expect(body.msg).toBe("Validation errors");
      });
      it("And the errorMsg should be set", async () => {
        expect(body.errorMsgs).toEqual({
          accountType: ["Please enter a valid account type."],
        });
      });
    });
    describe("When the payload is empty", () => {
      let res: any;
      let body: any;
      beforeAll(async () => {
        const event = apiGatewayProxyEventFactory.build({
          body: undefined,
        });
        res = await handler(event, context);
        body = JSON.parse(res.body);
      });
      it("Then the statuscode should be 422", async () => {
        expect(res.statusCode).toBe(422);
      });
      it("And the msg should be set", async () => {
        expect(body.msg).toBe("Validation errors");
      });
      it("And the errorMsg should be set", async () => {
        expect(body.errorMsgs).toEqual({
          accountType: ["Please enter a valid account type."],
        });
      });
    });
    describe("When the payload has an invalid accountType", () => {
      let res: any;
      let body: any;
      beforeAll(async () => {
        const event = apiGatewayProxyEventFactory.build({
          body: JSON.stringify({
            accountType: "rubbish",
          }),
        });
        res = await handler(event, context);
        body = JSON.parse(res.body);
      });
      it("Then the statuscode should be 422", async () => {
        expect(res.statusCode).toBe(422);
      });
      it("And the msg should be set", async () => {
        expect(body.msg).toBe("Validation errors");
      });
      it("And the errorMsg should be set", async () => {
        expect(body.errorMsgs).toEqual({
          accountType: ["Please enter a valid account type."],
        });
      });
    });
    //
    describe("When the payload has an accountType of google", () => {
      //
      describe("And the credential token is not set", () => {
        let res: any;
        let body: any;
        beforeAll(async () => {
          const event = apiGatewayProxyEventFactory.build({
            body: JSON.stringify({
              accountType: "google",
            }),
          });
          res = await handler(event, context);
          body = JSON.parse(res.body);
        });
        it("Then the statuscode should be 422", async () => {
          expect(res.statusCode).toBe(422);
        });
        it("And the msg should be set", async () => {
          expect(body.msg).toBe("Validation errors");
        });
        it("And the errorMsg should be set", async () => {
          expect(body.errorMsgs).toEqual({
            credential: ["Please enter a valid google token."],
          });
        });
      });
      describe("And the credential token is less than 15 characters", () => {
        let res: any;
        let body: any;
        beforeAll(async () => {
          const event = apiGatewayProxyEventFactory.build({
            body: JSON.stringify({
              accountType: "google",
              credential: "Sausage01!",
            }),
          });
          res = await handler(event, context);
          body = JSON.parse(res.body);
        });
        it("Then the statuscode should be 422", async () => {
          expect(res.statusCode).toBe(422);
        });
        it("And the msg should be set", async () => {
          expect(body.msg).toBe("Validation errors");
        });
        it("And the errorMsg should be set", async () => {
          expect(body.errorMsgs).toEqual({
            credential: ["Please enter a valid google token."],
          });
        });
      });
    });
    //
    describe("When the payload has an accountType of email", () => {
      //
      describe("And the email is not set", () => {
        describe("And the password is correct", () => {
          let res: any;
          let body: any;
          beforeAll(async () => {
            const event = apiGatewayProxyEventFactory.build({
              body: JSON.stringify({
                accountType: "email",
                password: "Sausage01!",
              }),
            });
            res = await handler(event, context);
            body = JSON.parse(res.body);
          });
          it("Then the statuscode should be 422", async () => {
            expect(res.statusCode).toBe(422);
          });
          it("And the msg should be set", async () => {
            expect(body.msg).toBe("Validation errors");
          });
          it("And the errorMsg should be set", async () => {
            expect(body.errorMsgs).toEqual({
              email: ["Please enter a valid email."],
            });
          });
        });
      });
      //
      describe("And the email is invalid", () => {
        describe("And the password is correct", () => {
          let res: any;
          let body: any;
          beforeAll(async () => {
            const event = apiGatewayProxyEventFactory.build({
              body: JSON.stringify({
                accountType: "email",
                email: "example@example",
                password: "Sausage01!",
              }),
            });
            res = await handler(event, context);
            body = JSON.parse(res.body);
          });
          it("Then the statuscode should be 422", async () => {
            expect(res.statusCode).toBe(422);
          });
          it("And the msg should be set", async () => {
            expect(body.msg).toBe("Validation errors");
          });
          it("And the errorMsg should be set", async () => {
            expect(body.errorMsgs).toEqual({
              email: ["Please enter a valid email."],
            });
          });
        });
      });

      describe("And the email is valid", () => {
        describe("And the password is not set", () => {
          let res: any;
          let body: any;
          beforeAll(async () => {
            const event = apiGatewayProxyEventFactory.build({
              body: JSON.stringify({
                accountType: "email",
                email: "example@example.com",
              }),
            });
            res = await handler(event, context);
            body = JSON.parse(res.body);
          });
          it("Then the statuscode should be 422", async () => {
            expect(res.statusCode).toBe(422);
          });
          it("And the msg should be set", async () => {
            expect(body.msg).toBe("Validation errors");
          });
          it("And the errorMsg should be set", async () => {
            expect(body.errorMsgs).toEqual({
              password: [
                "Password must be at least 6 characters.",
                "Password must contain an uppercase letter.",
                "Password must contain an lowercase letter.",
                "Password must contain a number.",
                "Password must contain a special character.",
              ],
            });
          });
        });
        describe("And the password is less than 6 characters", () => {
          let res: any;
          let body: any;
          beforeAll(async () => {
            const event = apiGatewayProxyEventFactory.build({
              body: JSON.stringify({
                accountType: "email",
                email: "example@example.com",
                password: "Hel0!",
              }),
            });
            res = await handler(event, context);
            body = JSON.parse(res.body);
          });
          it("Then the statuscode should be 422", async () => {
            expect(res.statusCode).toBe(422);
          });
          it("And the msg should be set", async () => {
            expect(body.msg).toBe("Validation errors");
          });
          it("And the errorMsg should be set", async () => {
            expect(body.errorMsgs).toEqual({
              password: ["Password must be at least 6 characters."],
            });
          });
        });
        describe("And the password is longer than 20 characters", () => {
          let res: any;
          let body: any;
          beforeAll(async () => {
            const event = apiGatewayProxyEventFactory.build({
              body: JSON.stringify({
                accountType: "email",
                email: "example@example.com",
                password: "Hello12345678901234567890!",
              }),
            });
            res = await handler(event, context);
            body = JSON.parse(res.body);
          });
          it("Then the statuscode should be 422", async () => {
            expect(res.statusCode).toBe(422);
          });
          it("And the msg should be set", async () => {
            expect(body.msg).toBe("Validation errors");
          });
          it("And the errorMsg should be set", async () => {
            expect(body.errorMsgs).toEqual({
              password: ["Password cannot be more than 20 characters."],
            });
          });
        });
        describe("And the password is missing an lowercase character", () => {
          let res: any;
          let body: any;
          beforeAll(async () => {
            const event = apiGatewayProxyEventFactory.build({
              body: JSON.stringify({
                accountType: "email",
                email: "example@example.com",
                password: "SAUSAGE01!",
              }),
            });
            res = await handler(event, context);
            body = JSON.parse(res.body);
          });
          it("Then the statuscode should be 422", async () => {
            expect(res.statusCode).toBe(422);
          });
          it("And the msg should be set", async () => {
            expect(body.msg).toBe("Validation errors");
          });
          it("And the errorMsg should be set", async () => {
            expect(body.errorMsgs).toEqual({
              password: ["Password must contain an lowercase letter."],
            });
          });
        });
        describe("And the password is missing an uppercase character", () => {
          let res: any;
          let body: any;
          beforeAll(async () => {
            const event = apiGatewayProxyEventFactory.build({
              body: JSON.stringify({
                accountType: "email",
                email: "example@example.com",
                password: "sausage01!",
              }),
            });
            res = await handler(event, context);
            body = JSON.parse(res.body);
          });
          it("Then the statuscode should be 422", async () => {
            expect(res.statusCode).toBe(422);
          });
          it("And the msg should be set", async () => {
            expect(body.msg).toBe("Validation errors");
          });
          it("And the errorMsg should be set", async () => {
            expect(body.errorMsgs).toEqual({
              password: ["Password must contain an uppercase letter."],
            });
          });
        });

        describe("And the password is missing a number", () => {
          let res: any;
          let body: any;
          beforeAll(async () => {
            const event = apiGatewayProxyEventFactory.build({
              body: JSON.stringify({
                accountType: "email",
                email: "example@example.com",
                password: "Sausageee!",
              }),
            });
            res = await handler(event, context);
            body = JSON.parse(res.body);
          });
          it("Then the statuscode should be 422", async () => {
            expect(res.statusCode).toBe(422);
          });
          it("And the msg should be set", async () => {
            expect(body.msg).toBe("Validation errors");
          });
          it("And the errorMsg should be set", async () => {
            expect(body.errorMsgs).toEqual({
              password: ["Password must contain a number."],
            });
          });
        });
        describe("And the password is missing a special character", () => {
          let res: any;
          let body: any;
          beforeAll(async () => {
            const event = apiGatewayProxyEventFactory.build({
              body: JSON.stringify({
                accountType: "email",
                email: "example@example.com",
                password: "Sausage01",
              }),
            });
            res = await handler(event, context);
            body = JSON.parse(res.body);
          });
          it("Then the statuscode should be 422", async () => {
            expect(res.statusCode).toBe(422);
          });
          it("And the msg should be set", async () => {
            expect(body.msg).toBe("Validation errors");
          });
          it("And the errorMsg should be set", async () => {
            expect(body.errorMsgs).toEqual({
              password: ["Password must contain a special character."],
            });
          });
        });
      });
    });
  });
});

// jest
//   .spyOn(vg, "verifyGoogleToken")
//   .mockImplementation(async (token: string) => ({
//     errorMsg: "Invalid google credentials. Please try again.....",
//   }));

// jest
//   .spyOn(vg, "verifyGoogleToken")
//   .mockImplementation(async (token: string) => ({
//     payload: {
//       iss: "https://accounts.google.com",
//       azp: "1066373686372-u5ks8n52sc6ffl86o97vsq52lme1maqh.apps.googleusercontent.com",
//       aud: "1066373686372-u5ks8n52sc6ffl86o97vsq52lme1maqh.apps.googleusercontent.com",
//       sub: "104960816048057138479",
//       email: "pompous.liberal@gmail.com",
//       email_verified: true,
//       nbf: 1720966232,
//       name: "Dave Ferguson",
//       picture:
//         "https://lh3.googleusercontent.com/a/ACg8ocJ9v9hblFEN2MrFGAybYb_JDW8NPJqjCakOPqAL55t0C7uFiQ=s96-c",
//       given_name: "Dave",
//       family_name: "Ferguson",
//       iat: 1720966532,
//       exp: 1720970132,
//       jti: "280944813103446a2a55e5725cef887ff4de4c0f",
//     },
//   }));

// /**
//  * Tests
//  *
//  * 1. Success
//  *   google no record exists
//  *     add to database
//  *     return 201
//  *     return token where added to database
//  *
//  *   email / password
//  *     add to
//  *
//  * 2. Invalid Payload
//  *   no accountType
//  *   invalid accountType
//  *
//  */

// // // Mock db connect
// // jest.mock("../../../../src/utils/db-utils");
// // // jest.mock("../../../../src/service/api/auth/helpers/verify-google-token");

// // const verifyGoogleTokenMock = jest.fn().mockImplementation((token: string) =>
// //   Promise.resolve({
// //     firstname: "poo",
// //     lastname: "wee",
// //   }),
// // );

// // // const verifyGoogleTokenMock = jest.fn().mockReturnValue({
// // //   firstname: "poo",
// // //   lastname: "wee",
// // // });
// // jest.mock(
// //   "../../../../src/service/api/auth/helpers/verify-google-token",
// //   () => {
// //     return jest.fn().mockImplementation(() => {
// //       return {
// //         verifyGoogleToken: jest.fn((credential: string) =>
// //           Promise.resolve({
// //             payload: {
// //               iss: "https://accounts.google.com",
// //               azp: "1066373686372-u5ks8n52sc6ffl86o97vsq52lme1maqh.apps.googleusercontent.com",
// //               aud: "1066373686372-u5ks8n52sc6ffl86o97vsq52lme1maqh.apps.googleusercontent.com",
// //               sub: "104960816048057138479",
// //               email: "pompous.liberal@gmail.com",
// //               email_verified: true,
// //               nbf: 1720966232,
// //               name: "Dave Ferguson",
// //               picture:
// //                 "https://lh3.googleusercontent.com/a/ACg8ocJ9v9hblFEN2MrFGAybYb_JDW8NPJqjCakOPqAL55t0C7uFiQ=s96-c",
// //               given_name: "Dave",
// //               family_name: "Ferguson",
// //               iat: 1720966532,
// //               exp: 1720970132,
// //               jti: "280944813103446a2a55e5725cef887ff4de4c0f",
// //             },
// //           }),
// //         ),
// //       };
// //       // return { verifyGoogleToken: verifyGoogleTokenMock() };
// //     });
// //   },
// // );

// describe("signup-checker", () => {
//   let spy;
//   afterAll((): void => {
//     jest.clearAllMocks();
//   });

//   beforeEach((): void => {
//     nock.disableNetConnect();
//     nock.cleanAll();

//     // spy = jest.spyOn(vg, "verifyGoogleToken");

//     // new DbConnection() .mockClear();
//   });

//   afterEach((): void => {
//     nock.enableNetConnect();
//     nock.cleanAll();
//   });

//   describe("Given we receive a successful google signup-check", () => {
//     let response: any;

//     beforeEach(async () => {
//       const event = apiGatewayProxyEventFactory.build({
//         body: JSON.stringify({
//           accountType: "google",
//           credential: "123456",
//         }),
//       });

//       const context = lambdaContextFactory.build();

//       response = await handler(event, context);
//       console.log("Response");
//       console.log(response);
//     });

//     test("Then statusCode is 201", () => {
//       expect(response.statusCode).toBe(201);
//     });
//   });
// });
