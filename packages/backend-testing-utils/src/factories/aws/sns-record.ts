import { randomUUID } from "crypto";
import { Factory } from "fishery";
import { SNSEventRecord } from "aws-lambda";
import { snsMessageFactory } from "./sns-message";

export const snsRecordFactory = Factory.define<SNSEventRecord>(
  ({ associations }) => ({
    EventVersion: "1.0",
    EventSubscriptionArn: `arn:aws:sns:us-east-2:123456789012:sns-lambda:${randomUUID()}`,
    EventSource: "aws:sns",
    Sns: associations.Sns || snsMessageFactory.build(),
  }),
);
