import { signupCheckerValidation } from "../../../../../src/schemas/auth/registration-validate";
import { ApiResponseError } from "../../../../../src/support/errors/errorHandler";

/**
 * Validates the signup-checker-validation
 *
 */
describe("signup-checker-validation", () => {
  describe("Given we receive a valid email payload", () => {
    const payload = {
      accountType: "email",
      email: "jt@example.com",
      password: "Example01!",
    };

    describe("When the payload is validated", () => {
      const res = signupCheckerValidation(payload);

      it("Then the payload should be returned as data", () => {
        expect(res).toEqual(payload);
      });
    });
  });

  describe("Given we receive a valid google payload", () => {
    describe("When the payload is validated", () => {
      const payload = {
        accountType: "google",
        credential: "ABCDEFGHIJKLMNOPQRST",
      };

      const res = signupCheckerValidation(payload);
      it("Then the payload should be returned as data", () => {
        expect(res).toEqual(payload);
      });
    });
  });

  describe("Given we receive an invalid payload", () => {
    describe("And the account type is missing", () => {
      describe("When the payload is validated", () => {
        const payload = {};

        it("Then an ApiResponseError should be thrown", () => {
          expect(() => {
            const res = signupCheckerValidation(payload);
          }).toThrow(ApiResponseError);
        });

        it("And the statuscode should be 422", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.statusCode).toEqual("422");
        });

        it("And the body should have an accountType validation message", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.body).toEqual(
            '{"message":"Validation errors","errorMsgs":{"accountType":["Please enter a valid account type."]}}',
          );
        });
      });
    });
  });

  describe("Given we receive an invalid google payload", () => {
    describe("And the google credential token is missing", () => {
      describe("When the payload is validated", () => {
        const payload = {
          accountType: "google",
        };

        it("Then an ApiResponseError should be thrown", () => {
          expect(() => {
            const res = signupCheckerValidation(payload);
          }).toThrow(ApiResponseError);
        });

        it("And the statuscode should be 422", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.statusCode).toEqual("422");
        });

        it("And the body should have a google credentials validation message", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.body).toEqual(
            '{"message":"Validation errors","errorMsgs":{"credential":["Please enter a valid google token."]}}',
          );
        });
      });
    });
  });

  describe("Given we receive an invalid google payload", () => {
    describe("And the google credential token is invalid", () => {
      describe("When the payload is validated", () => {
        const payload = {
          accountType: "google",
          credential: "ABCDEF123456",
        };

        it("Then an ApiResponseError should be thrown", () => {
          expect(() => {
            const res = signupCheckerValidation(payload);
          }).toThrow(ApiResponseError);
        });

        it("And the statuscode should be 422", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.statusCode).toEqual("422");
        });

        it("And the body should have a google credentials validation message", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.body).toEqual(
            '{"message":"Validation errors","errorMsgs":{"credential":["Please enter a valid google token."]}}',
          );
        });
      });
    });
  });

  describe("Given we receive an invalid email payload", () => {
    describe("And the email address is missing", () => {
      describe("When the payload is validated", () => {
        const payload = {
          accountType: "email",
          password: "Example01!",
        };

        it("Then an ApiResponseError should be thrown", () => {
          expect(() => {
            const res = signupCheckerValidation(payload);
          }).toThrow(ApiResponseError);
        });

        it("And the statuscode should be 422", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.statusCode).toEqual("422");
        });

        it("And the body should have an email validation message", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.body).toEqual(
            '{"message":"Validation errors","errorMsgs":{"email":["Please enter a valid email."]}}',
          );
        });
      });
    });
  });

  describe("Given we receive an invalid email payload", () => {
    describe("And the email address is invalid", () => {
      describe("When the payload is validated", () => {
        const payload = {
          accountType: "email",
          email: "dave@example",
          password: "Example01!",
        };

        it("Then an ApiResponseError should be thrown", () => {
          expect(() => {
            const res = signupCheckerValidation(payload);
          }).toThrow(ApiResponseError);
        });

        it("And the statuscode should be 422", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.statusCode).toEqual("422");
        });

        it("And the body should have an email validation message", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.body).toEqual(
            '{"message":"Validation errors","errorMsgs":{"email":["Please enter a valid email."]}}',
          );
        });
      });
    });
  });

  describe("Given we receive an invalid email payload", () => {
    describe("And the password is missing", () => {
      describe("When the payload is validated", () => {
        const payload = {
          accountType: "email",
          email: "dave@example.co.uk",
        };

        it("Then an ApiResponseError should be thrown", () => {
          expect(() => {
            const res = signupCheckerValidation(payload);
          }).toThrow(ApiResponseError);
        });

        it("And the statuscode should be 422", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.statusCode).toEqual("422");
        });

        it("And the body should list all the validation issues", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.body).toEqual(
            '{"message":"Validation errors","errorMsgs":{"password":["Password must be at least 8 characters.","Password must contain an uppercase letter.","Password must contain an lowercase letter.","Password must contain a number.","Password must contain a special character."]}}',
          );
        });
      });
    });
  });

  describe("Given we receive an invalid email payload", () => {
    describe("And the password is too short", () => {
      describe("When the payload is validated", () => {
        const payload = {
          accountType: "email",
          email: "dave@example.co.uk",
          password: "Exa01!",
        };

        it("Then an ApiResponseError should be thrown", () => {
          expect(() => {
            const res = signupCheckerValidation(payload);
          }).toThrow(ApiResponseError);
        });

        it("And the statuscode should be 422", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.statusCode).toEqual("422");
        });

        it("And the body should have a password too short validation message", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.body).toEqual(
            '{"message":"Validation errors","errorMsgs":{"password":["Password must be at least 8 characters."]}}',
          );
        });
      });
    });
  });

  describe("Given we receive an invalid email payload", () => {
    describe("And the password is too long", () => {
      describe("When the payload is validated", () => {
        const payload = {
          accountType: "email",
          email: "dave@example.co.uk",
          password: "Exa01adfafafafafafafadfadfafafa!",
        };

        it("Then an ApiResponseError should be thrown", () => {
          expect(() => {
            const res = signupCheckerValidation(payload);
          }).toThrow(ApiResponseError);
        });

        it("And the statuscode should be 422", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.statusCode).toEqual("422");
        });

        it("And the body should have a password too long validation message", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.body).toEqual(
            '{"message":"Validation errors","errorMsgs":{"password":["Password cannot be more than 20 characters."]}}',
          );
        });
      });
    });
  });

  describe("Given we receive an invalid email payload", () => {
    describe("And the password doesnt contain a lowercase character", () => {
      describe("When the payload is validated", () => {
        const payload = {
          accountType: "email",
          email: "dave@example.co.uk",
          password: "EXAMPLE01!",
        };

        it("Then an ApiResponseError should be thrown", () => {
          expect(() => {
            const res = signupCheckerValidation(payload);
          }).toThrow(ApiResponseError);
        });

        it("And the statuscode should be 422", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.statusCode).toEqual("422");
        });

        it("And the body should have a password missing lowercase letter validation message", () => {
          let error: ApiResponseError = new ApiResponseError("200", "", "");

          try {
            const res = signupCheckerValidation(payload);
          } catch (e) {
            error = e as ApiResponseError;
          }
          expect(error.body).toEqual(
            '{"message":"Validation errors","errorMsgs":{"password":["Password must contain an lowercase letter."]}}',
          );
        });
      });
    });

    describe("Given we receive an invalid email payload", () => {
      describe("And the password doesnt contain a uppercase character", () => {
        describe("When the payload is validated", () => {
          const payload = {
            accountType: "email",
            email: "dave@example.co.uk",
            password: "example01!",
          };

          it("Then an ApiResponseError should be thrown", () => {
            expect(() => {
              const res = signupCheckerValidation(payload);
            }).toThrow(ApiResponseError);
          });

          it("And the statuscode should be 422", () => {
            let error: ApiResponseError = new ApiResponseError("200", "", "");

            try {
              const res = signupCheckerValidation(payload);
            } catch (e) {
              error = e as ApiResponseError;
            }
            expect(error.statusCode).toEqual("422");
          });

          it("And the body should have a password missing uppercase letter validation message", () => {
            let error: ApiResponseError = new ApiResponseError("200", "", "");

            try {
              const res = signupCheckerValidation(payload);
            } catch (e) {
              error = e as ApiResponseError;
            }
            expect(error.body).toEqual(
              '{"message":"Validation errors","errorMsgs":{"password":["Password must contain an uppercase letter."]}}',
            );
          });
        });
      });
    });

    describe("Given we receive an invalid email payload", () => {
      describe("And the password doesnt contain a number", () => {
        describe("When the payload is validated", () => {
          const payload = {
            accountType: "email",
            email: "dave@example.co.uk",
            password: "Exampleaa!",
          };

          it("Then an ApiResponseError should be thrown", () => {
            expect(() => {
              const res = signupCheckerValidation(payload);
            }).toThrow(ApiResponseError);
          });

          it("And the statuscode should be 422", () => {
            let error: ApiResponseError = new ApiResponseError("200", "", "");

            try {
              const res = signupCheckerValidation(payload);
            } catch (e) {
              error = e as ApiResponseError;
            }
            expect(error.statusCode).toEqual("422");
          });

          it("And the body should have a password missing a number validation message", () => {
            let error: ApiResponseError = new ApiResponseError("200", "", "");

            try {
              const res = signupCheckerValidation(payload);
            } catch (e) {
              error = e as ApiResponseError;
            }
            expect(error.body).toEqual(
              '{"message":"Validation errors","errorMsgs":{"password":["Password must contain a number."]}}',
            );
          });
        });
      });
    });

    describe("Given we receive an invalid email payload", () => {
      describe("And the password doesnt contain a special character", () => {
        describe("When the payload is validated", () => {
          const payload = {
            accountType: "email",
            email: "dave@example.co.uk",
            password: "Example01",
          };

          it("Then an ApiResponseError should be thrown", () => {
            expect(() => {
              const res = signupCheckerValidation(payload);
            }).toThrow(ApiResponseError);
          });

          it("And the statuscode should be 422", () => {
            let error: ApiResponseError = new ApiResponseError("200", "", "");

            try {
              const res = signupCheckerValidation(payload);
            } catch (e) {
              error = e as ApiResponseError;
            }
            expect(error.statusCode).toEqual("422");
          });

          it("And the body should have a password missing a special character validation message", () => {
            let error: ApiResponseError = new ApiResponseError("200", "", "");

            try {
              const res = signupCheckerValidation(payload);
            } catch (e) {
              error = e as ApiResponseError;
            }
            expect(error.body).toEqual(
              '{"message":"Validation errors","errorMsgs":{"password":["Password must contain a special character."]}}',
            );
          });
        });
      });
    });
  });
});
