// import { z } from "zod";
import {
  SignupCheckerSchema,
  signupCheckerSchema,
} from "./signup-checker-schema";
import { ApiResponseError } from "../../support/errors/errorHandler";

/**
 *
 * @param body
 * @returns
 */
export const signupCheckerValidation = (body: unknown) => {
  // Validate the event body against the schema
  const res = signupCheckerSchema.safeParse(body);

  console.log("signupCheckerValidation");
  console.log(res);

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
