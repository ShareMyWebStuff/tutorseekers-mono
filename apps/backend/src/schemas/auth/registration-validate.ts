import {
  signupCheckerSchema,
  registerCompleteSchema,
  RegisterCompleteSchema,
} from "./registration-schema";
import { ApiResponseError } from "../../support/errors/errorHandler";

/**
 *
 * @param body
 * @returns
 */
export const signupCheckerValidation = (body: unknown) => {
  const res = signupCheckerSchema.safeParse(body);

  if (!res.success) {
    const errors: { [key: string]: string[] } = {};
    if (res.error) {
      res.error.issues.forEach((err) => {
        err.path.forEach((path) => {
          if (!errors[path]) {
            errors[path] = [err.message];
          } else {
            errors[path].push(err.message);
          }
        });
      });
    }
    throw new ApiResponseError(
      "422",
      "Signup checker validation",
      JSON.stringify({
        message: "Validation errors",
        errorMsgs: {
          ...errors,
        },
      }),
    );
    // return { success: res.success, data: null, errors };
  }
  return res.data;
  // return body as SignupCheckerSchema;
};

/**
 *
 * @param body
 * @returns
 */
export const registerCompleteValidation = (body: unknown) => {
  console.log("Res ++++++++++++++");
  const res = registerCompleteSchema.safeParse(body);
  console.log(JSON.stringify(res));

  if (!res.success) {
    const errors: { [key: string]: string[] } = {};
    if (res.error) {
      res.error.issues.forEach((err) => {
        err.path.forEach((path) => {
          if (!errors[path]) {
            errors[path] = [err.message];
          } else {
            errors[path].push(err.message);
          }
        });
      });
    }
    throw new ApiResponseError(
      "422",
      "Register complete validation",
      JSON.stringify({
        message: "Validation errors",
        errorMsgs: {
          ...errors,
        },
      }),
    );
  }
  return res.data as RegisterCompleteSchema;
};
