import { apiGatewayProxyEventFactory } from "../../../factory/api-gateway";
import { lambdaContextFactory } from "../../../factory/lambda-context";
import { handler } from "../../../../src/service/api/auth/poo";
import * as pooHelper from "../../../../src/service/api/auth/helpers/poo-helper";

// pooHelper.pooHelper = jest.fn().mockReturnValue({ sausages: "jeje" });
jest.spyOn(pooHelper, "pooHelper").mockReturnValue({
  firstName: "Poo",
  lastName: "Chufter",
});

jest.spyOn(pooHelper, "weeHelper").mockImplementation(async () => ({
  stuff: "Poop",
}));

const event = apiGatewayProxyEventFactory.build({
  body: JSON.stringify({
    accountType: "google",
    // email: "jonh@example.com",
    // password: "Sausages01!",
    credential: "123456",
  }),
});

const context = lambdaContextFactory.build();

describe("Poo test", () => {
  //   it("should work", async () => {
  //     const response = await handler(event, context);
  //     console.log("Response");
  //     console.log(response);
  //     expect(response.body).toEqual({
  //       firstName: "Poo",
  //       lastName: "Chufter",
  //     });
  //   });
  it("should work wee", async () => {
    const response = await handler(event, context);
    console.log("Response");
    console.log(response);
    expect(response.body).toEqual({
      stuff: "Poop",
    });
  });
});
