import { APIGatewayProxyEvent } from "aws-lambda";
import { z } from "zod";

// Define the google schema
const googleSchema = z
  .object({
    credential: z.string().min(5, "Please enter credential"),
  })
  .required();

// Define the email schema
const emailSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password cannot be over 20 characters long"),
});

// Define the signup checker schema
const signupCheckerSchema = z
  .object({
    accountType: z.enum(["google", "email"], {
      message: "Please enter a valid account type.",
    }),
    credential: z.string().min(5, "Please enter credential").optional(),
    email: z
      .string()
      .email({ message: "Please enter a valid email" })
      .optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password cannot be over 20 characters long")
      .optional(),
  })
  .superRefine((val, ctx) => {
    if (
      val.accountType === "google" &&
      (!val.credential || val.credential.length < 5)
    ) {
      ctx.addIssue({
        message: "Please enter a google token.",
        code: z.ZodIssueCode.custom,
        path: ["credential"],
      });
    }
    if (val.accountType === "email" && (!val.email || val.email.length < 5)) {
      ctx.addIssue({
        message: "Please enter a valid email.",
        code: z.ZodIssueCode.custom,
        path: ["email"],
      });
    }
    if (
      val.accountType === "email" &&
      (!val.password || val.password.length < 5)
    ) {
      ctx.addIssue({
        message: "Please enter a valid password.",
        code: z.ZodIssueCode.custom,
        path: ["password"],
      });
    }
  });

type SignupCheckerSchema = z.infer<typeof signupCheckerSchema>;

/**
 *
 * @param body
 * @returns
 */
export const signupCheckerValidation = (body: unknown) => {
  // Validate the event body against the schema
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
    return { success: res.success, data: errors };
  }

  return { success: res.success, data: body as SignupCheckerSchema };
};
