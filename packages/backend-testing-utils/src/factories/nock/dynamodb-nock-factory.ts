import nock, { RequestBodyMatcher } from "nock";

interface DynamoDBNockFactoryParameters {
  requestBody?: RequestBodyMatcher;
  responseBody: Record<string, unknown> | boolean;
  responseStatus: number;
  times: number;
  interceptorOptions?: nock.Options;
}

/**
 * Produce a nock interceptor/response for a dynamoDB POST request.
 *
 * In the case more than one call is performed (for multiple existence checks)
 * a number of times can be specified.
 *
 * @param [params] - An optional object, optionally containing the responseBody, requestBody and times fields.
 * @param [params.requestBody] - What request body, to filter by
 * @param [params.responseBody = true] - What to reply with.
 * @param [params.responseStatus = 201] - The status code to reply with. Defaults to 201 - CREATED
 * @param [params.times = 1] - Number of times to respond.
 * @returns nock.Scope
 */
export const dynamoDBNockFactory = (
  params?: Partial<DynamoDBNockFactoryParameters>,
): {
  dynamoDbNock: nock.Scope;
} => {
  const {
    requestBody,
    responseBody,
    responseStatus,
    times,
    interceptorOptions,
  }: DynamoDBNockFactoryParameters = {
    requestBody: undefined,
    responseBody: true,
    responseStatus: 201,
    times: 1,
    interceptorOptions: undefined,
    ...params,
  };

  const dynamoDbNock = nock("https://dynamodb.eu-west-1.amazonaws.com")
    .post("/", requestBody, interceptorOptions)
    .times(times)
    .reply(responseStatus, () => responseBody);

  return {
    dynamoDbNock,
  };
};
