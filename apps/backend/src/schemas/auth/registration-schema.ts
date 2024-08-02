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
//  * The schema for the final entering of the registration
//  */
// export const registerCompleteSchema = z
//   .object({
//     token: z.string().min(2, { message: "Please enter a token," }),
//     accountType: z.enum(["Tutor", "Student", "Parent"], {
//       message: "Please enter a valid account type.",
//     }),
//     title: z
//       .enum(["ns", "miss", "mrs", "ms", "mr", "mx", "dr", "prof"], {
//         message: "Please enter a valid title.",
//       })
//       .optional(),
//     firstname: z
//       .string()
//       .min(2, { message: "Your firstname must be at least 2 characters." })
//       .max(50, {
//         message: "Your firstname must be no more than 50 characters.",
//       })
//       .optional(),
//     lastname: z
//       .string()
//       .min(2, { message: "Your firstname must be at least 2 characters." })
//       .max(50, {
//         message: "Your firstname must be no more than 50 characters.",
//       })
//       .optional(),
//     gender: z
//       .enum(["ns", "f", "m", "p"], {
//         message: "Please select your gender.",
//       })
//       .optional(),
//     preferredName: z
//       .string()
//       .min(2, { message: "Your prefered name must be at least 2 characters." })
//       .max(50, {
//         message: "Your prefered name must be no more than 50 characters.",
//       }),
//     phone: z
//       .string()
//       .max(20, { message: "Must be 20 or less characters" })
//       .refine((val) => val.length === 0 || val.length >= 6, {
//         message: "Must be 5 - 20 characters",
//       })
//       .optional(),
//     mobile: z
//       .string()
//       .max(20, { message: "Must be 20 or less characters" })
//       .refine((val) => val.length === 0 || val.length >= 6, {
//         message: "Must be 5 - 20 characters",
//       })
//       .optional(),

//     address1: z
//       .string()
//       .min(2, { message: "Please enter the first line of your address" })
//       .max(80, { message: "Your address line cannot exceed 80 characters." })
//       .optional(),
//     address2: z
//       .string()
//       .min(2, { message: "Please enter the first line of your address" })
//       .max(80, { message: "Your address line cannot exceed 80 characters." })
//       .optional(),
//     town: z
//       .string()
//       .min(2, { message: "Please enter the town / city you live in." })
//       .max(80, { message: "Your town / city cannot exceed 80 characters." }),
//     county: z
//       .string()
//       .min(1, { message: "Enter your county" })
//       .max(80, { message: "Must be 80 or less characters" })
//       .optional(),
//     postcode: z
//       .string()
//       .min(3, { message: "Enter a valid postcode" })
//       .max(11, { message: "Must be 11 characters or less" }),

//     emailVerify: z.boolean({
//       message: "Please enter whether the email is verified,",
//     }),
//     readSafeguarding: z.literal(true, {
//       message: "Please read and agree to our safeguarding policy.",
//     }),
//     over18: z.literal(true, {
//       message: "You need to be at least 18 to create an account.",
//     }),
//     rightToWork: z
//       .literal(true, {
//         message: "Please confirm you have a right to work in this country.",
//       })
//       .optional(),
//     onlyAccount: z.literal(true, {
//       message: "Please ensure this is your only account with us.",
//     }),
//     agreeTerms: z.literal(true, {
//       message: "Please read and agree to our terms.",
//     }),
//   })
// // .superRefine((val, ctx) => {
// //   if (1 === 1) {
// //     ctx.addIssue({
// //       message: "Please enter a valid title.",
// //       code: z.ZodIssueCode.custom,
// //       path: ["title"],
// //     });
// //   }

// //   if (val.accountType === "Tutor") {
// //     if (!val.title) {
// //       ctx.addIssue({
// //         message: "Please enter a valid title.",
// //         code: z.ZodIssueCode.custom,
// //         path: ["title"],
// //       });
// //     }

// //     if (!val.firstname) {
// //       ctx.addIssue({
// //         message: "Please enter your first name.",
// //         code: z.ZodIssueCode.custom,
// //         path: ["firstname"],
// //       });
// //     }

// //     if (!val.lastname) {
// //       ctx.addIssue({
// //         message: "Please enter your last name.",
// //         code: z.ZodIssueCode.custom,
// //         path: ["lastname"],
// //       });
// //     }

// //     if (!val.gender) {
// //       ctx.addIssue({
// //         message: "Please select your gender.",
// //         code: z.ZodIssueCode.custom,
// //         path: ["gender"],
// //       });
// //     }

// //     if (!val.preferredName) {
// //       ctx.addIssue({
// //         message: "Please enter the name you prefer to be called.",
// //         code: z.ZodIssueCode.custom,
// //         path: ["preferredName"],
// //       });
// //     }

// //     if (!val.address1) {
// //       ctx.addIssue({
// //         message: "Please enter your address.",
// //         code: z.ZodIssueCode.custom,
// //         path: ["address1"],
// //       });
// //     }

// //     if (!val.county) {
// //       ctx.addIssue({
// //         message: "Please enter your county.",
// //         code: z.ZodIssueCode.custom,
// //         path: ["county"],
// //       });
// //     }

// //     if (!val.rightToWork) {
// //       ctx.addIssue({
// //         message: "Please confirm you have the right to work in this country.",
// //         code: z.ZodIssueCode.custom,
// //         path: ["rightToWork"],
// //       });
// //     }
// //   }
// // });

// export type RegisterCompleteSchema = z.infer<typeof registerCompleteSchema>;

const literalErrorMap: z.ZodErrorMap = (error, ctx) => {
  /*
  This is where you override the various error codes
  */
  switch (error.code) {
    case z.ZodIssueCode.invalid_literal:
      if (error.path.includes("readSafeguarding"))
        return { message: `Please read and agree to our safeguarding policy.` };
      else if (error.path.includes("over18"))
        return { message: `Please confirm you are 18 or over.` };
      else if (error.path.includes("rightToWork"))
        return {
          message: `Please confirm you have a right to work in this country.`,
        };
      else if (error.path.includes("onlyAccount"))
        return { message: `Please ensure this is your only account with us.` };
      else if (error.path.includes("agreeTerms"))
        return { message: `Please read and agree to our terms.` };
  }

  // fall back to default message!
  return { message: ctx.defaultError };
};

/**
 * The schema for the final entering of the registration
 */
export const registerCompleteParentSchema = z.object({
  accountType: z.literal("Parent"),
  token: z
    .string({ message: "Please enter a valid token." })
    .min(5, { message: "Please enter a valid token." }),
  preferredName: z
    .string({ message: "Please enter your preferred name." })
    .min(2, { message: "Your preferred name must be at least 2 characters." })
    .max(50, {
      message: "Your preferred name must be no more than 50 characters.",
    }),
  town: z
    .string({ message: "Please enter the town / city you live in." })
    .min(2, { message: "Your town / city must be more than 2 characters." })
    .max(80, { message: "Your town / city cannot exceed 80 characters." }),
  postcode: z
    .string({ message: "Please enter a valid postcode." })
    .min(3, { message: "Please enter a valid postcode." })
    .max(11, { message: "Postcode must be 11 characters or less." }),
  country: z
    .string({ message: "Please enter a valid country." })
    .min(3, { message: "Please enter a valid country." })
    .max(80, { message: "Country must be 80 or less characters." }),

  emailVerify: z.boolean({
    message: "Please enter whether the email is verified.",
    invalid_type_error: "Please enter whether the email is verified.",
  }),
  readSafeguarding: z.literal(true, {
    errorMap: literalErrorMap,
  }),
  over18: z.literal(true, {
    errorMap: literalErrorMap,
  }),
  onlyAccount: z.literal(true, {
    errorMap: literalErrorMap,
  }),
  agreeTerms: z.literal(true, {
    errorMap: literalErrorMap,
  }),
});

export type RegisterCompleteParentSchema = z.infer<
  typeof registerCompleteParentSchema
>;

export const registerCompleteStudentSchema = z.object({
  accountType: z.literal("Student"),
  token: z
    .string({ message: "Please enter a valid token." })
    .min(5, { message: "Please enter a valid token." }),
  preferredName: z
    .string({ message: "Please enter your preferred name." })
    .min(2, { message: "Your preferred name must be at least 2 characters." })
    .max(50, {
      message: "Your preferred name must be no more than 50 characters.",
    }),
  town: z
    .string({ message: "Please enter the town / city you live in." })
    .min(2, { message: "Your town / city must be more than 2 characters." })
    .max(80, { message: "Your town / city cannot exceed 80 characters." }),
  postcode: z
    .string({ message: "Please enter a valid postcode." })
    .min(3, { message: "Please enter a valid postcode." })
    .max(11, { message: "Postcode must be 11 characters or less." }),
  country: z
    .string({ message: "Please enter a valid country." })
    .min(3, { message: "Please enter a valid country." })
    .max(80, { message: "Country must be 80 or less characters." }),

  emailVerify: z.boolean({
    message: "Please enter whether the email is verified.",
    invalid_type_error: "Please enter whether the email is verified.",
  }),
  readSafeguarding: z.literal(true, {
    errorMap: literalErrorMap,
  }),
  over18: z.literal(true, {
    errorMap: literalErrorMap,
  }),
  // rightToWork: z.literal(true, {
  //   errorMap: literalErrorMap,
  // }),
  onlyAccount: z.literal(true, {
    errorMap: literalErrorMap,
  }),
  agreeTerms: z.literal(true, {
    errorMap: literalErrorMap,
  }),
});

export type RegisterCompleteStudentSchema = z.infer<
  typeof registerCompleteStudentSchema
>;

export const registerCompleteTutorSchema = z.object({
  accountType: z.literal("Tutor"),
  token: z
    .string({ message: "Please enter a valid token." })
    .min(5, { message: "Please enter a valid token." }),
  title: z.enum(["ns", "miss", "mrs", "ms", "mr", "mx", "dr", "prof"], {
    message: "Please enter a valid title.",
  }),
  firstname: z
    .string({ message: "Please enter your firstname." })
    .min(2, { message: "Your firstname must be at least 2 characters." })
    .max(50, {
      message: "Your firstname must be no more than 50 characters.",
    }),
  lastname: z
    .string({ message: "Please enter your last name." })
    .min(2, { message: "Your last name must be at least 2 characters." })
    .max(50, {
      message: "Your last name must be no more than 50 characters.",
    }),
  gender: z.enum(["ns", "f", "m", "p"], {
    message: "Please select your gender.",
  }),
  preferredName: z
    .string({ message: "Please enter your preferred name." })
    .min(2, { message: "Your preferred name must be at least 2 characters." })
    .max(50, {
      message: "Your preferred name must be no more than 50 characters.",
    }),
  phone: z
    .string({ message: "Please enter a valid phone number or leave blank." })
    .min(5, { message: "Phone must be at least 5 characters long." })
    .max(20, { message: "Phone can be up to 20 characters long." })
    .optional(),
  mobile: z
    .string({ message: "Please enter a valid mobile or leave blank." })
    .min(5, { message: "Mobile must be at least 5 characters long." })
    .max(20, { message: "Mobile can be up to 20 characters long." })
    .optional(),

  address1: z
    .string({ message: "Please enter your first line of your address." })
    .min(5, { message: "Address line must be atleast 5 characters in length." })
    .max(80, {
      message: "The first line of your address cannot exceed 80 characters.",
    }),
  address2: z
    .string({ message: "Please enter a valid address." })
    .max(80, {
      message: "The second line of your address cannot exceed 80 characters.",
    })
    .optional(),
  town: z
    .string({ message: "Please enter the town / city you live in." })
    .min(2, { message: "Your town / city must be more than 2 characters." })
    .max(80, { message: "Your town / city cannot exceed 80 characters." }),
  county: z
    .string({ message: "Please enter a valid county." })
    .min(2, { message: "Please enter a valid county." })
    .max(80, { message: "County must be 80 or less characters." })
    .optional(),
  postcode: z
    .string({ message: "Please enter a valid postcode." })
    .min(3, { message: "Please enter a valid postcode." })
    .max(11, { message: "Postcode must be 11 characters or less." }),
  country: z
    .string({ message: "Please enter a valid country." })
    .min(3, { message: "Please enter a valid country." })
    .max(80, { message: "Country must be 80 or less characters." }),

  emailVerify: z.boolean({
    message: "Please enter whether the email is verified.",
    invalid_type_error: "Please enter whether the email is verified.",
  }),
  readSafeguarding: z.literal(true, {
    errorMap: literalErrorMap,
  }),
  over18: z.literal(true, {
    errorMap: literalErrorMap,
  }),
  rightToWork: z.literal(true, {
    errorMap: literalErrorMap,
  }),
  onlyAccount: z.literal(true, {
    errorMap: literalErrorMap,
  }),
  agreeTerms: z.literal(true, {
    errorMap: literalErrorMap,
  }),
});

export type RegisterCompleteTutorSchema = z.infer<
  typeof registerCompleteTutorSchema
>;

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  /*
  This is where you override the various error codes
  */
  switch (error.code) {
    case z.ZodIssueCode.invalid_union_discriminator:
      return { message: `Please enter the type of account.` };
  }

  // fall back to default message!
  return { message: ctx.defaultError };
};

export const registerCompleteSchema = z.discriminatedUnion(
  "accountType",
  [
    registerCompleteParentSchema,
    registerCompleteStudentSchema,
    registerCompleteTutorSchema,
  ],
  {
    errorMap: customErrorMap,
  },
);

export type RegisterCompleteSchema = z.infer<typeof registerCompleteSchema>;
