import nock from "nock";

type SecretKeyValuePair = Record<string, string | number>;

type Secret = string | SecretKeyValuePair | undefined;

const isSecretAnObject = (secret: Secret): secret is SecretKeyValuePair =>
  secret !== undefined && typeof secret !== "string";

/**
 * Nock factory to create a secrets manager integration mock server.
 * This accepts either a key-value pair or a string which can be undefined
 * @param [secret] - The secret to add. This can be a string or a key-value pair
 * @returns The nock scope, and either the string passed or the key-value pair passed.
 */
export const secretsManagerNockFactory = <SecretType extends Secret>(
  secret: SecretType,
): {
  secretsManagerNock: nock.Scope;
  secret: SecretType;
} => {
  const secretToUpload = isSecretAnObject(secret)
    ? JSON.stringify(secret)
    : secret;

  const secretsManagerNock = nock(
    "https://secretsmanager.eu-west-1.amazonaws.com",
  )
    .post("/")
    .times(1)
    .reply(201, {
      SecretString: secretToUpload,
    });

  return {
    secretsManagerNock,
    secret,
  };
};
