import { randomUUID } from "crypto";
import { Factory } from "fishery";
import { SNSMessage } from "aws-lambda";

// Including both `URL` and `Url` variants of keys - as AWS officially uses UnsubscribeURL and SigningCertURL
// But @types/aws-lambda uses UnsubscribeUrl and SigningCertUrl which is wrong
// eslint-disable-next-line no-empty-pattern
export const snsMessageFactory = Factory.define<SNSMessage>(({}) => ({
  SignatureVersion: "1",
  Timestamp: "2019-01-02T12:45:07.000Z",
  Signature: "tcc6faL2yUC6dgZdmrwh1Y4cGa/ebXEkAi6RibDsvpi+tE/1+82j...65r==",
  SigningCertUrl:
    "https://sns.us-east-2.amazonaws.com/SimpleNotificationService-ac565b8b1a6c5d002d285f9598aa1d9b.pem",
  SigningCertURL:
    "https://sns.us-east-2.amazonaws.com/SimpleNotificationService-ac565b8b1a6c5d002d285f9598aa1d9b.pem",
  MessageId: randomUUID(),
  Message: "Hello from SNS!",
  MessageAttributes: {},
  Type: "Notification",
  UnsubscribeUrl:
    "https://sns.us-east-2.amazonaws.com/?Action=Unsubscribe&amp;SubscriptionArn=arn:aws:sns:us-east-2:123456789012:test-lambda:21be56ed-a058-49f5-8c98-aedd2564c486",
  UnsubscribeURL:
    "https://sns.us-east-2.amazonaws.com/?Action=Unsubscribe&amp;SubscriptionArn=arn:aws:sns:us-east-2:123456789012:test-lambda:21be56ed-a058-49f5-8c98-aedd2564c486",
  TopicArn: "arn:aws:sns:us-east-2:123456789012:sns-lambda",
  Subject: "TestInvoke",
}));
