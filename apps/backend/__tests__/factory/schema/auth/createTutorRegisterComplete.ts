import { Factory } from "fishery";
import { RegisterCompleteSchema } from "../../../../src/schemas/auth/registration-schema";

export const createTutorRegisterComplete =
  Factory.define<RegisterCompleteSchema>(
    // eslint-disable-next-line no-empty-pattern
    ({}) => ({
      accountType: "Tutor",
      token: "1234567890ABCDEF",
      title: "miss",
      firstname: "First",
      lastname: "Last",
      gender: "m",
      preferredName: "First Last",
      phone: "01483755899",
      mobile: "07970 543 432",

      address1: "1 Erica Close",
      address2: "",
      town: "Guildford",
      county: "Surrey",
      postcode: "GU21 4DA",
      country: "United Kingdom",
      emailVerify: true,
      readSafeguarding: true,
      over18: true,
      rightToWork: true,
      onlyAccount: true,
      agreeTerms: true,
    }),
  );
