import { registerCompleteValidation } from "../../../../../src/schemas/auth/registration-validate";
import {
  RegisterCompleteTutorSchema,
  RegisterCompleteParentSchema,
  RegisterCompleteStudentSchema,
} from "../../../../../src/schemas/auth/registration-schema";
import { ApiResponseError } from "../../../../../src/support/errors/errorHandler";
import { createTutorRegisterComplete } from "../../../../factory/schema/auth/createTutorRegisterComplete";
import { createParentRegisterComplete } from "../../../../factory/schema/auth/createParentRegisterComplete";
import { createStudentRegisterComplete } from "../../../../factory/schema/auth/createStudentRegisterComplete";

/**
 * Validates the signup-checker-validation
 */
describe("register-complete-validation", () => {
  /**
   * Payload is empty
   */
  describe("Unhappy path - payload issues", () => {
    describe("Given we receive an empty payload", () => {
      const payload = {};

      it("Then an ApiResponseError should be thrown", () => {
        expect(() => {
          const res = registerCompleteValidation(payload);
        }).toThrow(ApiResponseError);
      });

      it("And the statuscode should be 422", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.statusCode).toEqual("422");
      });

      it("And the body should produce an accountType validation message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"accountType":["Please enter the type of account."]}}',
        );
      });
    });

    describe("Given we receive a payload with only the account type - parent", () => {
      const payload = { accountType: "Parent" };

      it("Then an ApiResponseError should be thrown", () => {
        expect(() => {
          const res = registerCompleteValidation(payload);
        }).toThrow(ApiResponseError);
      });

      it("And the statuscode should be 422", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.statusCode).toEqual("422");
      });

      it("And the body should have a validation message for all missing Parent fields", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."],"preferredName":["Please enter your preferred name."],"town":["Please enter the town / city you live in."],"postcode":["Please enter a valid postcode."],"country":["Please enter a valid country."],"emailVerify":["Please enter whether the email is verified."],"readSafeguarding":["Please read and agree to our safeguarding policy."],"over18":["Please confirm you are 18 or over."],"onlyAccount":["Please ensure this is your only account with us."],"agreeTerms":["Please read and agree to our terms."]}}',
        );
      });
    });

    describe("Given we receive a payload with only the account type - student", () => {
      const payload = { accountType: "Student" };

      it("Then an ApiResponseError should be thrown", () => {
        expect(() => {
          const res = registerCompleteValidation(payload);
        }).toThrow(ApiResponseError);
      });

      it("And the statuscode should be 422", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.statusCode).toEqual("422");
      });

      it("And the body should have a validation message for all missing Student fields", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."],"preferredName":["Please enter your preferred name."],"town":["Please enter the town / city you live in."],"postcode":["Please enter a valid postcode."],"country":["Please enter a valid country."],"emailVerify":["Please enter whether the email is verified."],"readSafeguarding":["Please read and agree to our safeguarding policy."],"over18":["Please confirm you are 18 or over."],"onlyAccount":["Please ensure this is your only account with us."],"agreeTerms":["Please read and agree to our terms."]}}',
        );
      });
    });

    describe("Given we receive a payload with only the account type - tutor", () => {
      const payload = { accountType: "Tutor" };

      it("Then an ApiResponseError should be thrown", () => {
        expect(() => {
          const res = registerCompleteValidation(payload);
        }).toThrow(ApiResponseError);
      });

      it("And the statuscode should be 422", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.statusCode).toEqual("422");
      });

      it("And the body should have a validation message for all missing Tutor fields", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."],"title":["Please enter a valid title."],"firstname":["Please enter your firstname."],"lastname":["Please enter your last name."],"gender":["Please select your gender."],"preferredName":["Please enter your preferred name."],"address1":["Please enter your first line of your address."],"town":["Please enter the town / city you live in."],"postcode":["Please enter a valid postcode."],"country":["Please enter a valid country."],"emailVerify":["Please enter whether the email is verified."],"readSafeguarding":["Please read and agree to our safeguarding policy."],"over18":["Please confirm you are 18 or over."],"rightToWork":["Please confirm you have a right to work in this country."],"onlyAccount":["Please ensure this is your only account with us."],"agreeTerms":["Please read and agree to our terms."]}}',
        );
      });
    });
  });

  /**
   * Unhappy path - Tutor
   */
  describe("Unhappy path - tutor", () => {
    describe.each([
      {
        testDesc: "And the token is missing",
        fieldName: "token",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter a valid token."],
      },
      {
        testDesc: "And the token isnt a string",
        fieldName: "token",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid token."],
      },
      {
        testDesc: "And the token is invalid",
        fieldName: "token",
        fieldValue: "12",
        statusCode: "422",
        errorMsg: ["Please enter a valid token."],
      },
      // Title
      {
        testDesc: "And the title is missing",
        fieldName: "title",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter a valid title."],
      },
      {
        testDesc: "And the title isnt a string",
        fieldName: "title",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid title."],
      },
      {
        testDesc: "And the title is invalid",
        fieldName: "title",
        fieldValue: "12",
        statusCode: "422",
        errorMsg: ["Please enter a valid title."],
      },
      // Firstname
      {
        testDesc: "And the firstname is missing",
        fieldName: "firstname",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter your firstname."],
      },
      {
        testDesc: "And the firstname isnt a string",
        fieldName: "firstname",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter your firstname."],
      },
      {
        testDesc: "And the firstname is too small < 2",
        fieldName: "firstname",
        fieldValue: "A",
        statusCode: "422",
        errorMsg: ["Your firstname must be at least 2 characters."],
      },
      {
        testDesc: "And the firstname is too big",
        fieldName: "firstname",
        fieldValue: "012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["Your firstname must be no more than 50 characters."],
      },
      // Lastname
      {
        testDesc: "And the last name is missing",
        fieldName: "lastname",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter your last name."],
      },
      {
        testDesc: "And the last name isnt a string",
        fieldName: "lastname",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter your last name."],
      },
      {
        testDesc: "And the last name is too small < 2",
        fieldName: "lastname",
        fieldValue: "A",
        statusCode: "422",
        errorMsg: ["Your last name must be at least 2 characters."],
      },
      {
        testDesc: "And the last name is too big",
        fieldName: "lastname",
        fieldValue: "012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["Your last name must be no more than 50 characters."],
      },
      // Gender
      {
        testDesc: "And the gender is missing",
        fieldName: "gender",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please select your gender."],
      },
      {
        testDesc: "And the gender isnt a string",
        fieldName: "gender",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please select your gender."],
      },
      {
        testDesc: "And the gender is invalid",
        fieldName: "gender",
        fieldValue: "12",
        statusCode: "422",
        errorMsg: ["Please select your gender."],
      },
      // PreferredName
      {
        testDesc: "And the preferred name is missing",
        fieldName: "preferredName",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter your preferred name."],
      },
      {
        testDesc: "And the last name isnt a string",
        fieldName: "preferredName",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter your preferred name."],
      },
      {
        testDesc: "And the preferred name is too small < 2",
        fieldName: "preferredName",
        fieldValue: "A",
        statusCode: "422",
        errorMsg: ["Your preferred name must be at least 2 characters."],
      },
      {
        testDesc: "And the preferred name is too big",
        fieldName: "preferredName",
        fieldValue: "012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["Your preferred name must be no more than 50 characters."],
      },
      // Phone
      {
        testDesc: "And the phone isnt a string",
        fieldName: "phone",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid phone number or leave blank."],
      },
      {
        testDesc: "And the phone number is too short",
        fieldName: "phone",
        fieldValue: "12",
        statusCode: "422",
        errorMsg: ["Phone must be at least 5 characters long."],
      },
      {
        testDesc: "And the phone number is too long",
        fieldName: "phone",
        fieldValue: "0123456789012345678901",
        statusCode: "422",
        errorMsg: ["Phone can be up to 20 characters long."],
      },
      // Mobile
      {
        testDesc: "And the mobile isnt a string",
        fieldName: "mobile",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid mobile or leave blank."],
      },
      {
        testDesc: "And the mobile number is too short",
        fieldName: "mobile",
        fieldValue: "12",
        statusCode: "422",
        errorMsg: ["Mobile must be at least 5 characters long."],
      },
      {
        testDesc: "And the mobile number is too long",
        fieldName: "mobile",
        fieldValue: "0123456789012345678901",
        statusCode: "422",
        errorMsg: ["Mobile can be up to 20 characters long."],
      },
      // Address 1
      {
        testDesc: "And the first address line is missing",
        fieldName: "address1",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter your first line of your address."],
      },
      {
        testDesc: "And the first address line isnt a string",
        fieldName: "address1",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter your first line of your address."],
      },
      {
        testDesc: "And the first address line is too short",
        fieldName: "address1",
        fieldValue: "1",
        statusCode: "422",
        errorMsg: ["Address line must be atleast 5 characters in length."],
      },
      {
        testDesc: "And the first address line is too long",
        fieldName: "address1",
        fieldValue:
          "012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: [
          "The first line of your address cannot exceed 80 characters.",
        ],
      },
      // Address 2
      {
        testDesc: "And the second address line isnt a string",
        fieldName: "address2",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid address."],
      },
      {
        testDesc: "And the second address line is too long",
        fieldName: "address2",
        fieldValue:
          "012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: [
          "The second line of your address cannot exceed 80 characters.",
        ],
      },
      // Town
      {
        testDesc: "And the town is missing",
        fieldName: "town",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter the town / city you live in."],
      },
      {
        testDesc: "And the town isnt a string",
        fieldName: "town",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter the town / city you live in."],
      },
      {
        testDesc: "And the town is too short",
        fieldName: "town",
        fieldValue: "1",
        statusCode: "422",
        errorMsg: ["Your town / city must be more than 2 characters."],
      },
      {
        testDesc: "And the town is too long",
        fieldName: "town",
        fieldValue:
          "012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["Your town / city cannot exceed 80 characters."],
      },
      // County
      {
        testDesc: "And the county isnt a string",
        fieldName: "county",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid county."],
      },
      {
        testDesc: "And the county is too short",
        fieldName: "county",
        fieldValue: "1",
        statusCode: "422",
        errorMsg: ["Please enter a valid county."],
      },
      {
        testDesc: "And the county is too long",
        fieldName: "county",
        fieldValue:
          "012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["County must be 80 or less characters."],
      },
      // Postcode
      {
        testDesc: "And the postcode is missing",
        fieldName: "postcode",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter a valid postcode."],
      },
      {
        testDesc: "And the postcode isnt a string",
        fieldName: "postcode",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid postcode."],
      },
      {
        testDesc: "And the postcode is too short",
        fieldName: "postcode",
        fieldValue: "1",
        statusCode: "422",
        errorMsg: ["Please enter a valid postcode."],
      },
      {
        testDesc: "And the postcode is too long",
        fieldName: "postcode",
        fieldValue: "012345678901",
        statusCode: "422",
        errorMsg: ["Postcode must be 11 characters or less."],
      },
      // Country
      {
        testDesc: "And the country is missing",
        fieldName: "country",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter a valid country."],
      },
      {
        testDesc: "And the country isnt a string",
        fieldName: "country",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid country."],
      },
      {
        testDesc: "And the country is too short",
        fieldName: "country",
        fieldValue: "1",
        statusCode: "422",
        errorMsg: ["Please enter a valid country."],
      },
      {
        testDesc: "And the country is too long",
        fieldName: "country",
        fieldValue:
          "012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["Country must be 80 or less characters."],
      },
      // Email Verify
      {
        testDesc: "And the email verify is missing",
        fieldName: "emailVerify",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter whether the email is verified."],
      },
      {
        testDesc: "And the email verify isnt a string",
        fieldName: "emailVerify",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter whether the email is verified."],
      },
      // Read Safeguarding
      {
        testDesc: "And the safeguarding flag is missing",
        fieldName: "readSafeguarding",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please read and agree to our safeguarding policy."],
      },
      {
        testDesc: "And the safeguarding flag isnt a string",
        fieldName: "readSafeguarding",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please read and agree to our safeguarding policy."],
      },
      {
        testDesc: "And the safeguarding flag isnt true",
        fieldName: "readSafeguarding",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please read and agree to our safeguarding policy."],
      },
      // Over 18
      {
        testDesc: "And the over 18 flag is missing",
        fieldName: "over18",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please confirm you are 18 or over."],
      },
      {
        testDesc: "And the over 18 flag isnt a string",
        fieldName: "over18",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please confirm you are 18 or over."],
      },
      {
        testDesc: "And the over 18 flag isnt true",
        fieldName: "over18",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please confirm you are 18 or over."],
      },
      // Right to Work
      {
        testDesc: "And the right to work flag is missing",
        fieldName: "rightToWork",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please confirm you have a right to work in this country."],
      },
      {
        testDesc: "And the right to work flag isnt a string",
        fieldName: "rightToWork",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please confirm you have a right to work in this country."],
      },
      {
        testDesc: "And the right to work flag isnt true",
        fieldName: "rightToWork",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please confirm you have a right to work in this country."],
      },
      // Only Account
      {
        testDesc: "And the only account flag is missing",
        fieldName: "onlyAccount",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please ensure this is your only account with us."],
      },
      {
        testDesc: "And the only account flag isnt a string",
        fieldName: "onlyAccount",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please ensure this is your only account with us."],
      },
      {
        testDesc: "And the only account flag isnt true",
        fieldName: "onlyAccount",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please ensure this is your only account with us."],
      },
      // Agree Terms
      {
        testDesc: "And the agree terms flag is missing",
        fieldName: "agreeTerms",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please read and agree to our terms."],
      },
      {
        testDesc: "And the agree terms flag isnt a string",
        fieldName: "agreeTerms",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please read and agree to our terms."],
      },
      {
        testDesc: "And the agree terms flag isnt true",
        fieldName: "agreeTerms",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please read and agree to our terms."],
      },
    ])(
      "Given we receive a tutors payload",
      ({ testDesc, fieldName, fieldValue, statusCode, errorMsg }) => {
        describe(testDesc, () => {
          let payload: Partial<RegisterCompleteTutorSchema> = {};
          let errorThrown = false;
          let error: ApiResponseError | null = null;
          let res: RegisterCompleteTutorSchema;
          beforeEach(() => {
            payload =
              createTutorRegisterComplete.build() as Partial<RegisterCompleteTutorSchema>;
            // @ts-ignore
            if (payload[fieldName]) delete payload[fieldName];
            if (fieldValue !== undefined) {
              // @ts-ignore
              payload[fieldName] = fieldValue;
            }
            try {
              console.log(payload);
              res = registerCompleteValidation(
                payload,
              ) as RegisterCompleteTutorSchema;
            } catch (e) {
              errorThrown = true;
              error = e as ApiResponseError;
              error.body = JSON.parse(error.body);
            }
          });

          // ApiResponseError thrown
          it("Then an error should be thrown", () => {
            expect(errorThrown).toBe(true);
          });
          it("And the thrown error should be an ApiResponseError", () => {
            expect(error).toBeInstanceOf(ApiResponseError);
          });
          it(`And the statusCode is ${statusCode}`, () => {
            // @ts-ignore
            expect(error.statusCode).toEqual(statusCode);
          });
          it("And the body should contain a descriptive error message", () => {
            // @ts-ignore
            console.log(error.body);
            // @ts-ignore
            expect(error.body.errorMsgs[fieldName]).toEqual(errorMsg);
          });
        });
      },
    );
  });

  /**
   * Happy path - Tutor
   */
  describe("Happy path - tutor", () => {
    describe("Given we receive a correct tutors payload", () => {
      let payload: RegisterCompleteTutorSchema;
      beforeEach(() => {
        payload =
          createTutorRegisterComplete.build() as RegisterCompleteTutorSchema;
      });

      describe("And tutor fields are populated", () => {
        it("Then the response should match the payload", () => {
          const res = registerCompleteValidation(
            payload,
          ) as RegisterCompleteTutorSchema;

          // @ts-ignore
          console.log(payload);
          console.log(res);
          // @ts-ignore
          expect(res).toEqual(payload);
        });
      });
      describe("And optional phone is missing", () => {
        it("Then the response should match the payload", () => {
          delete payload["phone"];
          const res = registerCompleteValidation(
            payload,
          ) as RegisterCompleteTutorSchema;
          // @ts-ignore
          console.log(res);
          // @ts-ignore
          expect(res).toEqual(payload);
        });
      });
      describe("And optional mobile is missing", () => {
        it("Then the response should match the payload", () => {
          delete payload["mobile"];
          const res = registerCompleteValidation(
            payload,
          ) as RegisterCompleteTutorSchema;
          // @ts-ignore
          console.log(res);
          // @ts-ignore
          expect(res).toEqual(payload);
        });
      });
      describe("And optional address2 is missing", () => {
        it("Then the response should match the payload", () => {
          delete payload["address2"];
          const res = registerCompleteValidation(
            payload,
          ) as RegisterCompleteTutorSchema;
          // @ts-ignore
          console.log(res);
          // @ts-ignore
          expect(res).toEqual(payload);
        });
      });
      describe("And optional county is missing", () => {
        it("Then the response should match the payload", () => {
          delete payload["county"];
          const res = registerCompleteValidation(
            payload,
          ) as RegisterCompleteTutorSchema;
          // @ts-ignore
          console.log(res);
          // @ts-ignore
          expect(res).toEqual(payload);
        });
      });
    });
  });

  /**
   * Unhappy path - Parent
   */
  describe("Unhappy path - parent", () => {
    describe.each([
      // Token
      {
        testDesc: "And the token is missing",
        fieldName: "token",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter a valid token."],
      },
      {
        testDesc: "And the token isnt a string",
        fieldName: "token",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid token."],
      },
      {
        testDesc: "And the token is invalid",
        fieldName: "token",
        fieldValue: "12",
        statusCode: "422",
        errorMsg: ["Please enter a valid token."],
      },
      // PreferredName
      {
        testDesc: "And the preferred name is missing",
        fieldName: "preferredName",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter your preferred name."],
      },
      {
        testDesc: "And the last name isnt a string",
        fieldName: "preferredName",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter your preferred name."],
      },
      {
        testDesc: "And the preferred name is too small < 2",
        fieldName: "preferredName",
        fieldValue: "A",
        statusCode: "422",
        errorMsg: ["Your preferred name must be at least 2 characters."],
      },
      {
        testDesc: "And the preferred name is too big",
        fieldName: "preferredName",
        fieldValue: "012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["Your preferred name must be no more than 50 characters."],
      },
      // Town
      {
        testDesc: "And the town is missing",
        fieldName: "town",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter the town / city you live in."],
      },
      {
        testDesc: "And the town isnt a string",
        fieldName: "town",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter the town / city you live in."],
      },
      {
        testDesc: "And the town is too short",
        fieldName: "town",
        fieldValue: "1",
        statusCode: "422",
        errorMsg: ["Your town / city must be more than 2 characters."],
      },
      {
        testDesc: "And the town is too long",
        fieldName: "town",
        fieldValue:
          "012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["Your town / city cannot exceed 80 characters."],
      },
      // Postcode
      {
        testDesc: "And the postcode is missing",
        fieldName: "postcode",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter a valid postcode."],
      },
      {
        testDesc: "And the postcode isnt a string",
        fieldName: "postcode",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid postcode."],
      },
      {
        testDesc: "And the postcode is too short",
        fieldName: "postcode",
        fieldValue: "1",
        statusCode: "422",
        errorMsg: ["Please enter a valid postcode."],
      },
      {
        testDesc: "And the postcode is too long",
        fieldName: "postcode",
        fieldValue: "012345678901",
        statusCode: "422",
        errorMsg: ["Postcode must be 11 characters or less."],
      },
      // Country
      {
        testDesc: "And the country is missing",
        fieldName: "country",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter a valid country."],
      },
      {
        testDesc: "And the country isnt a string",
        fieldName: "country",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid country."],
      },
      {
        testDesc: "And the country is too short",
        fieldName: "country",
        fieldValue: "1",
        statusCode: "422",
        errorMsg: ["Please enter a valid country."],
      },
      {
        testDesc: "And the country is too long",
        fieldName: "country",
        fieldValue:
          "012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["Country must be 80 or less characters."],
      },
      // Email Verify
      {
        testDesc: "And the email verify is missing",
        fieldName: "emailVerify",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter whether the email is verified."],
      },
      {
        testDesc: "And the email verify isnt a string",
        fieldName: "emailVerify",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter whether the email is verified."],
      },
      // Read Safeguarding
      {
        testDesc: "And the safeguarding flag is missing",
        fieldName: "readSafeguarding",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please read and agree to our safeguarding policy."],
      },
      {
        testDesc: "And the safeguarding flag isnt a string",
        fieldName: "readSafeguarding",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please read and agree to our safeguarding policy."],
      },
      {
        testDesc: "And the safeguarding flag isnt true",
        fieldName: "readSafeguarding",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please read and agree to our safeguarding policy."],
      },
      // Over 18
      {
        testDesc: "And the over 18 flag is missing",
        fieldName: "over18",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please confirm you are 18 or over."],
      },
      {
        testDesc: "And the over 18 flag isnt a string",
        fieldName: "over18",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please confirm you are 18 or over."],
      },
      {
        testDesc: "And the over 18 flag isnt true",
        fieldName: "over18",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please confirm you are 18 or over."],
      },
      // Only Account
      {
        testDesc: "And the only account flag is missing",
        fieldName: "onlyAccount",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please ensure this is your only account with us."],
      },
      {
        testDesc: "And the only account flag isnt a string",
        fieldName: "onlyAccount",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please ensure this is your only account with us."],
      },
      {
        testDesc: "And the only account flag isnt true",
        fieldName: "onlyAccount",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please ensure this is your only account with us."],
      },
      // Agree Terms
      {
        testDesc: "And the agree terms flag is missing",
        fieldName: "agreeTerms",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please read and agree to our terms."],
      },
      {
        testDesc: "And the agree terms flag isnt a string",
        fieldName: "agreeTerms",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please read and agree to our terms."],
      },
      {
        testDesc: "And the agree terms flag isnt true",
        fieldName: "agreeTerms",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please read and agree to our terms."],
      },
    ])(
      "Given we receive a parents payload",
      ({ testDesc, fieldName, fieldValue, statusCode, errorMsg }) => {
        describe(testDesc, () => {
          let payload: Partial<RegisterCompleteParentSchema> = {};
          let errorThrown = false;
          let error: ApiResponseError | null = null;
          let res: RegisterCompleteParentSchema;
          beforeEach(() => {
            payload =
              createParentRegisterComplete.build() as Partial<RegisterCompleteParentSchema>;
            // @ts-ignore
            if (payload[fieldName]) delete payload[fieldName];
            if (fieldValue !== undefined) {
              // @ts-ignore
              payload[fieldName] = fieldValue;
            }
            try {
              console.log(payload);
              res = registerCompleteValidation(
                payload,
              ) as RegisterCompleteParentSchema;
            } catch (e) {
              errorThrown = true;
              error = e as ApiResponseError;
              error.body = JSON.parse(error.body);
            }
          });

          // ApiResponseError thrown
          it("Then an error should be thrown", () => {
            expect(errorThrown).toBe(true);
          });
          it("And the thrown error should be an ApiResponseError", () => {
            expect(error).toBeInstanceOf(ApiResponseError);
          });
          it(`And the statusCode is ${statusCode}`, () => {
            // @ts-ignore
            expect(error.statusCode).toEqual(statusCode);
          });
          it("And the body should contain a descriptive error message", () => {
            // @ts-ignore
            console.log(error.body);
            // @ts-ignore
            expect(error.body.errorMsgs[fieldName]).toEqual(errorMsg);
          });
        });
      },
    );
  });

  /**
   * Happy path - Parent
   */
  describe("Happy path - parent", () => {
    describe("Given we receive a correct parents payload", () => {
      const payload =
        createParentRegisterComplete.build() as RegisterCompleteParentSchema;
      const res = registerCompleteValidation(
        payload,
      ) as RegisterCompleteParentSchema;

      it("And the body should contain a descriptive error message", () => {
        // @ts-ignore
        console.log(res);
        // @ts-ignore
        expect(res).toEqual(payload);
      });
    });
  });

  /**
   * Unhappy path - Student
   */
  describe("Unhappy path - student", () => {
    describe.each([
      // Token
      {
        testDesc: "And the token is missing",
        fieldName: "token",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter a valid token."],
      },
      {
        testDesc: "And the token isnt a string",
        fieldName: "token",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid token."],
      },
      {
        testDesc: "And the token is invalid",
        fieldName: "token",
        fieldValue: "12",
        statusCode: "422",
        errorMsg: ["Please enter a valid token."],
      },
      // PreferredName
      {
        testDesc: "And the preferred name is missing",
        fieldName: "preferredName",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter your preferred name."],
      },
      {
        testDesc: "And the last name isnt a string",
        fieldName: "preferredName",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter your preferred name."],
      },
      {
        testDesc: "And the preferred name is too small < 2",
        fieldName: "preferredName",
        fieldValue: "A",
        statusCode: "422",
        errorMsg: ["Your preferred name must be at least 2 characters."],
      },
      {
        testDesc: "And the preferred name is too big",
        fieldName: "preferredName",
        fieldValue: "012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["Your preferred name must be no more than 50 characters."],
      },
      // Town
      {
        testDesc: "And the town is missing",
        fieldName: "town",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter the town / city you live in."],
      },
      {
        testDesc: "And the town isnt a string",
        fieldName: "town",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter the town / city you live in."],
      },
      {
        testDesc: "And the town is too short",
        fieldName: "town",
        fieldValue: "1",
        statusCode: "422",
        errorMsg: ["Your town / city must be more than 2 characters."],
      },
      {
        testDesc: "And the town is too long",
        fieldName: "town",
        fieldValue:
          "012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["Your town / city cannot exceed 80 characters."],
      },
      // Postcode
      {
        testDesc: "And the postcode is missing",
        fieldName: "postcode",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter a valid postcode."],
      },
      {
        testDesc: "And the postcode isnt a string",
        fieldName: "postcode",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid postcode."],
      },
      {
        testDesc: "And the postcode is too short",
        fieldName: "postcode",
        fieldValue: "1",
        statusCode: "422",
        errorMsg: ["Please enter a valid postcode."],
      },
      {
        testDesc: "And the postcode is too long",
        fieldName: "postcode",
        fieldValue: "012345678901",
        statusCode: "422",
        errorMsg: ["Postcode must be 11 characters or less."],
      },
      // Country
      {
        testDesc: "And the country is missing",
        fieldName: "country",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter a valid country."],
      },
      {
        testDesc: "And the country isnt a string",
        fieldName: "country",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter a valid country."],
      },
      {
        testDesc: "And the country is too short",
        fieldName: "country",
        fieldValue: "1",
        statusCode: "422",
        errorMsg: ["Please enter a valid country."],
      },
      {
        testDesc: "And the country is too long",
        fieldName: "country",
        fieldValue:
          "012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        statusCode: "422",
        errorMsg: ["Country must be 80 or less characters."],
      },
      // Email Verify
      {
        testDesc: "And the email verify is missing",
        fieldName: "emailVerify",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please enter whether the email is verified."],
      },
      {
        testDesc: "And the email verify isnt a string",
        fieldName: "emailVerify",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please enter whether the email is verified."],
      },
      // Read Safeguarding
      {
        testDesc: "And the safeguarding flag is missing",
        fieldName: "readSafeguarding",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please read and agree to our safeguarding policy."],
      },
      {
        testDesc: "And the safeguarding flag isnt a string",
        fieldName: "readSafeguarding",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please read and agree to our safeguarding policy."],
      },
      {
        testDesc: "And the safeguarding flag isnt true",
        fieldName: "readSafeguarding",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please read and agree to our safeguarding policy."],
      },
      // Over 18
      {
        testDesc: "And the over 18 flag is missing",
        fieldName: "over18",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please confirm you are 18 or over."],
      },
      {
        testDesc: "And the over 18 flag isnt a string",
        fieldName: "over18",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please confirm you are 18 or over."],
      },
      {
        testDesc: "And the over 18 flag isnt true",
        fieldName: "over18",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please confirm you are 18 or over."],
      },
      // Only Account
      {
        testDesc: "And the only account flag is missing",
        fieldName: "onlyAccount",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please ensure this is your only account with us."],
      },
      {
        testDesc: "And the only account flag isnt a string",
        fieldName: "onlyAccount",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please ensure this is your only account with us."],
      },
      {
        testDesc: "And the only account flag isnt true",
        fieldName: "onlyAccount",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please ensure this is your only account with us."],
      },
      // Agree Terms
      {
        testDesc: "And the agree terms flag is missing",
        fieldName: "agreeTerms",
        fieldValue: undefined,
        statusCode: "422",
        errorMsg: ["Please read and agree to our terms."],
      },
      {
        testDesc: "And the agree terms flag isnt a string",
        fieldName: "agreeTerms",
        fieldValue: 10,
        statusCode: "422",
        errorMsg: ["Please read and agree to our terms."],
      },
      {
        testDesc: "And the agree terms flag isnt true",
        fieldName: "agreeTerms",
        fieldValue: false,
        statusCode: "422",
        errorMsg: ["Please read and agree to our terms."],
      },
    ])(
      "Given we receive a students payload",
      ({ testDesc, fieldName, fieldValue, statusCode, errorMsg }) => {
        describe(testDesc, () => {
          let payload: Partial<RegisterCompleteStudentSchema> = {};
          let errorThrown = false;
          let error: ApiResponseError | null = null;
          let res: RegisterCompleteStudentSchema;
          beforeEach(() => {
            payload =
              createStudentRegisterComplete.build() as Partial<RegisterCompleteStudentSchema>;
            // @ts-ignore
            if (payload[fieldName]) delete payload[fieldName];
            if (fieldValue !== undefined) {
              // @ts-ignore
              payload[fieldName] = fieldValue;
            }
            try {
              console.log(payload);
              res = registerCompleteValidation(
                payload,
              ) as RegisterCompleteStudentSchema;
            } catch (e) {
              errorThrown = true;
              error = e as ApiResponseError;
              error.body = JSON.parse(error.body);
            }
          });

          // ApiResponseError thrown
          it("Then an error should be thrown", () => {
            expect(errorThrown).toBe(true);
          });
          it("And the thrown error should be an ApiResponseError", () => {
            expect(error).toBeInstanceOf(ApiResponseError);
          });
          it(`And the statusCode is ${statusCode}`, () => {
            // @ts-ignore
            expect(error.statusCode).toEqual(statusCode);
          });
          it("And the body should contain a descriptive error message", () => {
            // @ts-ignore
            console.log(error.body);
            // @ts-ignore
            expect(error.body.errorMsgs[fieldName]).toEqual(errorMsg);
          });
        });
      },
    );
  });

  /**
   * Happy path - Student
   */
  describe("Happy path - student", () => {
    describe("Given we receive a correct parents payload", () => {
      const payload =
        createStudentRegisterComplete.build() as RegisterCompleteStudentSchema;
      const res = registerCompleteValidation(
        payload,
      ) as RegisterCompleteStudentSchema;

      it("And the body should contain a descriptive error message", () => {
        // @ts-ignore
        console.log(res);
        // @ts-ignore
        expect(res).toEqual(payload);
      });
    });
  });
});
