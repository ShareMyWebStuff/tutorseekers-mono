import { randomUUID } from "crypto";
import { Factory } from "fishery";
import { SQSRecord } from "aws-lambda";

// eslint-disable-next-line no-empty-pattern
export const sqsRecordFactory = Factory.define<SQSRecord>(({}) => ({
  messageId: randomUUID(),
  receiptHandle: "MessageReceiptHandle",
  body: "Hello from SQS!",
  attributes: {
    ApproximateReceiveCount: "1",
    SentTimestamp: "1523232000000",
    SenderId: "123456789012",
    ApproximateFirstReceiveTimestamp: "1523232000001",
  },
  messageAttributes: {},
  md5OfBody: "{{{md5_of_body}}}",
  eventSource: "aws:sqs",
  eventSourceARN: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
  awsRegion: "us-east-1",
}));
