import { signupCheckerValidation } from "../../../../../src/schemas/auth/signup-checker-validate";

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

      it("Then success should be true", () => {
        expect(res.success).toBeTruthy();
      });
      it("And the payload should be returned as data", () => {
        expect(res.data).toEqual(payload);
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
      it("Then success should be true", () => {
        expect(res.success).toBeTruthy();
      });
      it("And the payload should be returned as data", () => {
        expect(res.data).toEqual(payload);
      });
    });
  });

  describe("Given we receive an empty payload", () => {
    describe("When the payload is validated", () => {
      const payload = {};

      const res = signupCheckerValidation(payload);
      console.log(res);
      it("Then success should be false", () => {
        expect(res.success).toBeFalsy();
      });
      it("And an error message should be generated", () => {
        expect(res.data).toEqual({
          accountType: ["Please enter a valid account type."],
        });
      });
    });
  });

  describe("Given we receive an invalid payload", () => {
    describe("And the account type is missing", () => {
      describe("When the payload is validated", () => {
        const payload = {};

        const res = signupCheckerValidation(payload);
        it("Then success should be false", () => {
          expect(res.success).toBeFalsy();
        });
        it("And an error message should be generated", () => {
          expect(res.data).toEqual({
            accountType: ["Please enter a valid account type."],
          });
        });
      });
    });
  });

  describe("Given we receive an invalid payload", () => {
    describe("And the account type is missing", () => {
      describe("When the payload is validated", () => {
        const payload = {};

        const res = signupCheckerValidation(payload);
        it("Then success should be false", () => {
          expect(res.success).toBeFalsy();
        });
        it("And an error message should be generated", () => {
          expect(res.data).toEqual({
            accountType: ["Please enter a valid account type."],
          });
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

        const res = signupCheckerValidation(payload);
        it("Then success should be false", () => {
          expect(res.success).toBeFalsy();
        });
        it("And an error message should be generated", () => {
          expect(res.data).toEqual({
            credential: ["Please enter a valid google token."],
          });
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

        const res = signupCheckerValidation(payload);
        it("Then success should be false", () => {
          expect(res.success).toBeFalsy();
        });
        it("And an error message should be generated", () => {
          expect(res.data).toEqual({
            credential: ["Please enter a valid google token."],
          });
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

        const res = signupCheckerValidation(payload);
        it("Then success should be false", () => {
          expect(res.success).toBeFalsy();
        });
        it("And an error message should be generated", () => {
          expect(res.data).toEqual({
            email: ["Please enter a valid email."],
          });
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

        const res = signupCheckerValidation(payload);
        it("Then success should be false", () => {
          expect(res.success).toBeFalsy();
        });
        it("And an error message should be generated", () => {
          expect(res.data).toEqual({
            email: ["Please enter a valid email."],
          });
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

        const res = signupCheckerValidation(payload);
        it("Then success should be false", () => {
          expect(res.success).toBeFalsy();
        });
        it("And an error message should be generated", () => {
          expect(res.data).toEqual({
            password: [
              "Password must be at least 8 characters.",
              "Password must contain an uppercase letter.",
              "Password must contain an lowercase letter.",
              "Password must contain a number.",
              "Password must contain a special character.",
            ],
          });
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

        const res = signupCheckerValidation(payload);

        console.log(res);
        it("Then success should be false", () => {
          expect(res.success).toBeFalsy();
        });
        it("And an error message should be generated", () => {
          expect(res.data).toEqual({
            password: ["Password must be at least 8 characters."],
          });
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

        const res = signupCheckerValidation(payload);

        console.log(res);
        it("Then success should be false", () => {
          expect(res.success).toBeFalsy();
        });
        it("And an error message should be generated", () => {
          expect(res.data).toEqual({
            password: ["Password cannot be more than 20 characters."],
          });
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

        const res = signupCheckerValidation(payload);

        console.log(res);
        it("Then success should be false", () => {
          expect(res.success).toBeFalsy();
        });
        it("And an error message should be generated", () => {
          expect(res.data).toEqual({
            password: ["Password must contain an lowercase letter."],
          });
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

          const res = signupCheckerValidation(payload);

          console.log(res);
          it("Then success should be false", () => {
            expect(res.success).toBeFalsy();
          });
          it("And an error message should be generated", () => {
            expect(res.data).toEqual({
              password: ["Password must contain an uppercase letter."],
            });
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

          const res = signupCheckerValidation(payload);

          console.log(res);
          it("Then success should be false", () => {
            expect(res.success).toBeFalsy();
          });
          it("And an error message should be generated", () => {
            expect(res.data).toEqual({
              password: ["Password must contain a number."],
            });
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

          const res = signupCheckerValidation(payload);

          console.log(res);
          it("Then success should be false", () => {
            expect(res.success).toBeFalsy();
          });
          it("And an error message should be generated", () => {
            expect(res.data).toEqual({
              password: ["Password must contain a special character."],
            });
          });
        });
      });
    });
  });
});
