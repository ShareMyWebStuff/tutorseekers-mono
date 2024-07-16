import { z } from "zod";

// Define the signup checker schema
export const signupCheckerSchema = z
  .object({
    accountType: z.enum(["google", "email"], {
      message: "Please enter a valid account type.",
    }),
    credential: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.accountType === "google") {
      if (!val.credential || val.credential.length < 15) {
        ctx.addIssue({
          message: "Please enter a valid google token.",
          code: z.ZodIssueCode.custom,
          path: ["credential"],
        });
      }
    }

    if (val.accountType === "email") {
      const emailRegex =
        /^(?!\.)(?!.*\.\.)([A-Z0-9_'+-\.]*)[A-Z0-9_'+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

      const email = val.email || "";
      const password = val.password || "";
      const uppercase = password.match(/[A-Z]/);
      const lowercase = password.match(/[a-z]/);
      const digit = password.match(/\d/);
      const special = password.match(/[^A-Za-z0-9]/);

      if (!emailRegex.test(email)) {
        ctx.addIssue({
          message: "Please enter a valid email.",
          code: z.ZodIssueCode.custom,
          path: ["email"],
        });
      }

      if (password.length < 8) {
        ctx.addIssue({
          message: "Password must be at least 8 characters.",
          code: z.ZodIssueCode.custom,
          path: ["password"],
        });
      }
      if (password.length > 20) {
        ctx.addIssue({
          message: "Password cannot be more than 20 characters.",
          code: z.ZodIssueCode.custom,
          path: ["password"],
        });
      }
      if (!uppercase) {
        ctx.addIssue({
          message: "Password must contain an uppercase letter.",
          code: z.ZodIssueCode.custom,
          path: ["password"],
        });
      }

      if (!lowercase) {
        ctx.addIssue({
          message: "Password must contain an lowercase letter.",
          code: z.ZodIssueCode.custom,
          path: ["password"],
        });
      }

      if (!digit) {
        ctx.addIssue({
          message: "Password must contain a number.",
          code: z.ZodIssueCode.custom,
          path: ["password"],
        });
      }

      if (!special) {
        ctx.addIssue({
          message: "Password must contain a special character.",
          code: z.ZodIssueCode.custom,
          path: ["password"],
        });
      }
    }
  });

export type SignupCheckerSchema = z.infer<typeof signupCheckerSchema>;

// /**
//  *
//  * @param body
//  * @returns
//  */
// export const signupCheckerValidation = (body: unknown) => {
//   // Validate the event body against the schema
//   const res = signupCheckerSchema.safeParse(body);

//   if (!res.success) {
//     const errors: { [key: string]: string[] } = {};
//     if (res.error) {
//       res.error.issues.forEach((err) => {
//         err.path.forEach((path) => {
//           if (!errors[path]) {
//             errors[path] = [err.message];
//           } else {
//             errors[path].push(err.message);
//           }
//         });
//       });
//     }
//     return { success: res.success, data: errors };
//   }

//   return { success: res.success, data: body as SignupCheckerSchema };
// };
