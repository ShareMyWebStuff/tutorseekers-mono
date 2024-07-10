import nock from "nock";

type Methods = "GET" | "PUT";

type SuccessfulResponseParameters = {
  responseBody?: Buffer | Record<string, unknown> | string | boolean;
  responseStatus?: number;
};

type ErrorResponseParameters = {
  responseError: string;
};

type EmptyResponseParameters = {
  emptyResponse: true;
};

export type S3NockFactoryParameters = {
  s3BucketName: string;
  filePath: string | RegExp;
  interceptorOptions?: nock.Options;
  queryParams?: Parameters<nock.Interceptor["query"]>[0];
  method?: Methods;
} & (
  | SuccessfulResponseParameters
  | ErrorResponseParameters
  | EmptyResponseParameters
);

type S3NockFactoryErrorResponseParameters = ErrorResponseParameters & {
  nockInterceptor: nock.Interceptor;
};

const s3NockFactoryErrorResponse = (
  params: S3NockFactoryErrorResponseParameters,
): nock.Scope => {
  const { nockInterceptor, responseError } = {
    ...params,
  };

  return nockInterceptor.replyWithError(responseError);
};

type S3NockFactorySuccessfulResponseParameters = (
  | SuccessfulResponseParameters
  | EmptyResponseParameters
) & {
  nockInterceptor: nock.Interceptor;
};

const s3NockFactorySuccessfulResponse = (
  params: S3NockFactorySuccessfulResponseParameters,
): nock.Scope => {
  const successfulResponse = `<?xml version="1.0" encoding="UTF-8"?>
  <CopyObjectResult>
     <ETag>09b3f19f-0b27-430d-9f83-fb4d12e3632c</ETag>
     <LastModified>2021-11-29T16:01:57.282Z</LastModified>
  </CopyObjectResult>`;

  const { nockInterceptor, responseStatus, responseBody, emptyResponse } = {
    responseStatus: 201,
    responseBody: successfulResponse,
    emptyResponse: false,
    ...params,
  };

  return nockInterceptor.reply(responseStatus, () =>
    emptyResponse ? undefined : responseBody,
  );
};

/**
 * Produce a nock interceptor/response for an S3 PUT Request.
 *
 * In the case more than one call is performed (for multiple existence checks)
 * a number of times can be specified. Defaults to a successful response.
 *
 * @param params - An optional object, optionally containing the responseBody, requestBody and times fields.
 * @param params.s3BucketName - The bucket name to nock
 * @param params.filePath - The path of the file (with extension)
 * @param [params.interceptorOptions] - Interceptor options to pass to nock.
 * @param [params.queryParams] - The optional query params to pass to nock.
 * @param [params.method = PUT] - The HTTP method do use
 * @param [params.emptyResponse] - When this is set to true, the s3 nock is generated such that it replies
 * with an empty response. Do not use responseStatus, responseError and responseBody with this.
 * @param [params.responseBody = `<?xml version="1.0" encoding="UTF-8"?>
 * <CopyObjectResult>
 *    <ETag>09b3f19f-0b27-430d-9f83-fb4d12e3632c</ETag>
 *    <LastModified>2021-11-29T16:01:57.282Z</LastModified>
 * </CopyObjectResult>`] - What to reply with. Do not use responseError and emptyResponse if using this.
 * @param [params.responseStatus = 201] - The status code to reply with. Defaults to 201 - CREATED.
 * Do not use responseError and emptyResponse if using this.
 * @param [params.responseError] - The error to reply with. Do not use responseBody
 * and responseStatus and emptyResponse if using this.
 * @returns nock.Scope and a function that returns the request body
 */
export const s3NockFactory = <S3RequestBodyType>({
  s3BucketName,
  filePath,
  interceptorOptions,
  queryParams,
  method = "PUT",
  ...params
}: S3NockFactoryParameters): {
  s3Nock: nock.Scope;
  getS3NockRequestBody: () => S3RequestBodyType;
} => {
  let s3RequestBody: S3RequestBodyType;

  const nockInterceptor = nock(
    `https://${s3BucketName}.s3.eu-west-1.amazonaws.com`,
  )
    .persist()
    .intercept(
      filePath,
      method,
      (body: S3RequestBodyType) => {
        s3RequestBody = body;
        return true;
      },
      interceptorOptions,
    );

  if (queryParams) {
    nockInterceptor.query(queryParams);
  }

  const s3Nock =
    "responseError" in params
      ? s3NockFactoryErrorResponse({
          nockInterceptor,
          ...params,
        })
      : s3NockFactorySuccessfulResponse({
          nockInterceptor,
          ...params,
        });

  const getS3NockRequestBody = () => s3RequestBody;

  return {
    s3Nock,
    getS3NockRequestBody,
  };
};
