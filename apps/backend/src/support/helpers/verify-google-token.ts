import { OAuth2Client, TokenPayload } from "google-auth-library";
import { ApiResponseError } from "../../support/errors/errorHandler";

const GOOGLE_CLIENT_ID =
  "1066373686372-u5ks8n52sc6ffl86o97vsq52lme1maqh.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (token: string) => {
  console.log("verifyGoogleToken");

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (payload === undefined) {
      throw new Error("Validation issue");
    }
    return payload;
  } catch (error) {
    throw new ApiResponseError(
      "401",
      "Google credential verification",
      JSON.stringify({
        message: "Google credential verification",
        errorMsgs: {
          message: "Cannot retrieve google details, please try again.",
        },
      }),
    );
  }
};
