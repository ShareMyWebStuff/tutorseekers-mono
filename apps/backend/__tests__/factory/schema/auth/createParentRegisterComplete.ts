import { Factory } from "fishery";
import { RegisterCompleteSchema } from "../../../../src/schemas/auth/registration-schema";

export const createParentRegisterComplete =
  Factory.define<RegisterCompleteSchema>(
    // eslint-disable-next-line no-empty-pattern
    ({}) => ({
      accountType: "Student",
      token: "1234567890ABCDEF",
      preferredName: "First Last",
      town: "Guildford",
      postcode: "GU21 4DA",
      country: "United Kingdom",
      emailVerify: true,
      readSafeguarding: true,
      over18: true,
      onlyAccount: true,
      agreeTerms: true,
    }),
  );
