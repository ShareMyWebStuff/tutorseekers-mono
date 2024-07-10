import { randomUUID } from "crypto";
import { Factory } from "fishery";
import { Context } from "aws-lambda";

// eslint-disable-next-line no-empty-pattern
export const lambdaContextFactory = Factory.define<Context>(({}) => ({
  callbackWaitsForEmptyEventLoop: false,
  functionName: "functionName",
  functionVersion: "1",
  invokedFunctionArn: "arn",
  memoryLimitInMB: "512",
  awsRequestId: randomUUID(),
  logGroupName: "logGroupName",
  logStreamName: "logStreamName",
  identity: undefined,
  clientContext: undefined,
  getRemainingTimeInMillis: () => 5000,
  done: () => {},
  fail: () => {},
  succeed: () => {},
}));
