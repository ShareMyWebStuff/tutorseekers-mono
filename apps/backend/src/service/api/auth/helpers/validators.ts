import { z } from "zod";

const requestSchema = z
  .object({
    accountType: z.enum(["email", "google"], {
      required_error: "Please enter the the account type (email | google).",
    }),
    credential: z
      .string()
      .min(5, "Please enter credential")
      .or(z.literal(undefined)),
    email: z
      .string()
      .email({ message: "Please enter valid email" })
      .or(z.literal(undefined)),
    // password: z.string().or(z.literal(undefined))
    password: z
      .string()
      .min(8, { message: "Must be between 8-20 characters long." })
      .max(20, { message: "Must be between 8-20 characters long." })
      .regex(passwordValidation, {
        message:
          "Password must contain at least 1 uppercase character, a number and one of the following #?!@$%^&*-",
      })
      .or(z.literal(undefined)),
  })
  .superRefine((values, ctx) => {
    if (!!values.accountType) {
      if (values.accountType === "google" && !values.credential) {
        ctx.addIssue({
          message: "Please enter google jwt.",
          code: z.ZodIssueCode.custom,
          path: ["credential"],
        });
      }
      if (values.accountType === "email" && !values.email) {
        ctx.addIssue({
          message: "Please enter email.",
          code: z.ZodIssueCode.custom,
          path: ["email"],
        });
      }
      if (values.accountType === "email" && !values.password) {
        ctx.addIssue({
          message: "Please enter password.",
          code: z.ZodIssueCode.custom,
          path: ["password"],
        });
      }
    }
  });

type RequestSchema = z.infer<typeof requestSchema>;
