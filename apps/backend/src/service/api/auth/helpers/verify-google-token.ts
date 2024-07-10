import { OAuth2Client } from "google-auth-library";

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
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
};
