import { registerCompleteValidation } from "../../../../../src/schemas/auth/registration-validate";
import {
  RegisterCompleteSchema,
  RegisterCompleteTutorSchema,
} from "../../../../../src/schemas/auth/registration-schema";
import { ApiResponseError } from "../../../../../src/support/errors/errorHandler";
import { createTutorRegisterComplete } from "../../../../factory/schema/auth/createTutorRegisterComplete";

// const validTutorpayload = {
//   accountType: "Tutor",
//   token: "1234567890ABCDEF",
//   title: "miss",
//   firstname: 'First',
//   lastname: 'Last',
//   gender: "m",
//   preferredName: 'First Last',
//   phone: '01483755899',
//   mobile: '07970 543 432',
//   address1: '1 Erica Close',
//   address2: '',
//   town: 'Guildford',
//   county: 'Surrey',
//   postcode: 'GU21 4DA',
//   emailVerify: true,
//   readSafeguarding: true,
//   over18: true,
//   rightToWork: true,
//   onlyAccount: true,
//   agreeTerms: true,
//   };
/**
 * Validates the signup-checker-validation
 *
 */
describe("register-complete-validation", () => {
  /**
   * token
   * undefined
   * length 0
   *
   */
  /**
   * NEED TO
   *
   * Empty Payload
   * accoutType = 'test' - should error
   * Parent
   *   Invalid
   *   Valid
   * Student
   *   Invalid
   *   Valid
   * Tutor
   *   Invalid
   *   Valid
   */
  describe("Given we receive a tutors payload with only the account type - tutor", () => {
    /**
     * Token - missing
     */
    describe("And we have a missing token", () => {
      const payload =
        createTutorRegisterComplete.build() as Partial<RegisterCompleteTutorSchema>;
      if (payload.token) delete payload["token"];

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."]}}',
        );
      });
    });

    /**
     * Token - isnt a string
     */
    describe("And the token isnt a string", () => {
      const payload =
        createTutorRegisterComplete.build() as Partial<RegisterCompleteTutorSchema>;
      if (payload.token) delete payload["token"];
      // tslint:disable-next-line
      payload.token = 10;

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."]}}',
        );
      });
    });

    /**
     * Token - missing
     */
    describe("And we have a missing token", () => {
      const payload =
        createTutorRegisterComplete.build() as Partial<RegisterCompleteTutorSchema>;
      if (payload.token) delete payload["token"];

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."]}}',
        );
      });
    });

    /**
     * Title
     */
    // And title is missing
    // And title isnt a string
    // And title is invalid
    // And firstname is missing
    // And firstname isnt a string
    // And firstname is less than 2 characters
    // And firstname is longer than 50 characters
    // And lastname is missing
    // And lastname isnt a string
    // And lastname is less than 2 characters
    // And lastname is longer than 50 characters
    // And gender is missing
    // And gender isnt a string
    // And gender is invalid
    // And prefered name is missing
    // And prefered name isnt a string
    // And prefered name is less than 2 characters
    // And prefered name is longer than 50 characters
    // And phone isnt a string
    // And phone is less than 5 characters
    // And phone is longer than 20 characters
    // And mobile isnt a string
    // And mobile is less than 5 characters
    // And mobile is longer than 20 characters
    // And address 1 is missing
    // And address 1 isnt a string
    // And address 1 is less than 2 characters
    // And address 1 is longer than 80 characters
    // And address 2 isnt a string
    // And address 2 is less than 2 characters
    // And address 2 is longer than 80 characters
    // And town is missing
    // And town isnt a string
    // And town is less than 2 characters
    // And town is longer than 80 characters
    // And county isnt a string
    // And county is less than 2 characters
    // And county is longer than 80 characters
    // And postcode is missing
    // And postcode isnt a string
    // And postcode is less than 3 characters
    // And postcode is longer than 11 characters
    // And emailVerify is missing
    // And emailVerify isnt a boolean
    // And readSafeguarding is missing
    // And readSafeguarding isnt a boolean
    // And readSafeguarding isnt true
    // And over18 is missing
    // And over18 isnt a boolean
    // And over18 isnt true
    // And rightToWork is missing
    // And rightToWork isnt a boolean
    // And rightToWork isnt true
    // And onlyAccount is missing
    // And onlyAccount isnt a boolean
    // And onlyAccount isnt true
    // And agreeTerms is missing
    // And agreeTerms isnt a boolean
    // And agreeTerms isnt true
    // DO WE NEED COUNTRY
    // TUTOR COULD TEACH FROM ABROAD
    // PARENT / STUDENT COULD BE OVERSEAS AND WANT ONLINE LESSONS
    // Success
    // firstname 2 characters
    // firstname 50 characters
    // lastname 2 characters
    // lastname 50 characters
    // phone missing
    // phone provided
    // mobile missing
    // mobile provided
  });
  describe("Given we receive a parents payload with only the account type - parents", () => {
    describe("And we have a missing token", () => {
      const payload = { accountType: "Parent", preferredName: "Test Name" };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."]}}',
        );
      });
    });

    // And token isnt a string
    describe("And the token isnt a string", () => {
      const payload = {
        accountType: "Parent",
        token: 10,
        preferredName: "Test Name",
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."]}}',
        );
      });
    });

    // And token isnt a string
    describe("And the token is too short", () => {
      const payload = {
        accountType: "Parent",
        token: "a",
        preferredName: "Test Name",
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a token,"]}}',
        );
      });
    });

    //
    // And token isnt a string
    describe("And the prefered name is missing", () => {
      const payload = {
        accountType: "Parent",
        token: "1234567890",
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"preferredName":["Please enter your prefered name."]}}',
        );
      });
    });

    // And prefered name isnt a string
    describe("And the prefered name isnt a string", () => {
      const payload = {
        accountType: "Parent",
        token: "1234567890",
        preferredName: 10,
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"preferredName":["Please enter your prefered name."]}}',
        );
      });
    });
    // And prefered name is less than 2 characters
    describe("And the prefered name is too short", () => {
      const payload = {
        accountType: "Parent",
        token: "1234567890",
        preferredName: "D",
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"preferredName":["Your prefered name must be at least 2 characters."]}}',
        );
      });
    });
    // And prefered name is longer than 50 characters
    describe("And the prefered name is too long", () => {
      const payload = {
        accountType: "Parent",
        token: "1234567890",
        preferredName: "012345678901234567890123456789012345678901234567890",
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"preferredName":["Your prefered name must be no more than 50 characters."]}}',
        );
      });
    });

    //
    // Successful parent
    describe("And the payload is valid", () => {
      const payload = {
        accountType: "Parent",
        token: "1234567890",
        preferredName: "Test User",
      };
      let res: RegisterCompleteSchema | null = null;
      try {
        res = registerCompleteValidation(payload);
      } catch (e) {
        res = null;
      }

      it("Then an ApiResponseError should not be thrown", () => {
        expect(res).not.toBeNull();
      });

      it("And the body should have contain the payload", () => {
        expect(res).toEqual(payload);
      });
    });
  });

  /**
   *
   * Testing a student payload
   *
   */
  describe("Given we receive a student payload with only the account type - student", () => {
    // And token is missing
    describe("And we have a missing token", () => {
      const payload = { accountType: "Student", preferredName: "Test Name" };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."]}}',
        );
      });
    });

    // And token isnt a string
    describe("And the token isnt a string", () => {
      const payload = {
        accountType: "Student",
        token: 10,
        preferredName: "Test Name",
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."]}}',
        );
      });
    });

    // And token isnt a string
    describe("And the token is too short", () => {
      const payload = {
        accountType: "Student",
        token: "a",
        preferredName: "Test Name",
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a token,"]}}',
        );
      });
    });

    //
    // And token isnt a string
    describe("And the prefered name is missing", () => {
      const payload = {
        accountType: "Student",
        token: "1234567890",
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"preferredName":["Please enter your prefered name."]}}',
        );
      });
    });

    // And prefered name isnt a string
    describe("And the prefered name isnt a string", () => {
      const payload = {
        accountType: "Student",
        token: "1234567890",
        preferredName: 10,
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"preferredName":["Please enter your prefered name."]}}',
        );
      });
    });
    // And prefered name is less than 2 characters
    describe("And the prefered name is too short", () => {
      const payload = {
        accountType: "Student",
        token: "1234567890",
        preferredName: "D",
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"preferredName":["Your prefered name must be at least 2 characters."]}}',
        );
      });
    });
    // And prefered name is longer than 50 characters
    describe("And the prefered name is too long", () => {
      const payload = {
        accountType: "Student",
        token: "1234567890",
        preferredName: "012345678901234567890123456789012345678901234567890",
      };

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

      it("And the body should have contain the appropiate message", () => {
        let error: ApiResponseError = new ApiResponseError("200", "", "");

        try {
          const res = registerCompleteValidation(payload);
        } catch (e) {
          error = e as ApiResponseError;
        }
        expect(error.body).toEqual(
          '{"message":"Validation errors","errorMsgs":{"preferredName":["Your prefered name must be no more than 50 characters."]}}',
        );
      });
    });

    //
    // Successful parent
    describe("And the payload is valid", () => {
      const payload = {
        accountType: "Student",
        token: "1234567890",
        preferredName: "Test User",
      };
      let res: RegisterCompleteSchema | null = null;
      try {
        res = registerCompleteValidation(payload);
      } catch (e) {
        res = null;
      }

      it("Then an ApiResponseError should not be thrown", () => {
        expect(res).not.toBeNull();
      });

      it("And the body should have contain the payload", () => {
        expect(res).toEqual(payload);
      });
    });
  });
  /**
   *
   *
   *
   */
  describe("Given we receive a payload with an account type issue", () => {
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
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."],"preferredName":["Please enter your prefered name."]}}',
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
          '{"message":"Validation errors","errorMsgs":{"token":["Please enter a valid token."],"preferredName":["Please enter your prefered name."]}}',
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
          '{"message":"Validation errors","errorMsgs":{"token":["Required"],"title":["Please enter a valid title."],"firstname":["Required"],"lastname":["Required"],"gender":["Please select your gender."],"preferredName":["Required"],"address1":["Required"],"town":["Required"],"postcode":["Required"],"emailVerify":["Please enter whether the email is verified,"],"readSafeguarding":["Please read and agree to our safeguarding policy."],"over18":["You need to be at least 18 to create an account."],"rightToWork":["Please confirm you have a right to work in this country."],"onlyAccount":["Please ensure this is your only account with us."],"agreeTerms":["Please read and agree to our terms."]}}',
        );
      });
    });
  });
});
