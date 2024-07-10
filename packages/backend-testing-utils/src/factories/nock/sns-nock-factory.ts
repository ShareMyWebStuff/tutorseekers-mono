import { SNSMessage } from "aws-lambda";
import nock from "nock";
import { randomUUID } from "crypto";
import { BaseEvent } from "@shieldpay/backend-events-sdk";

export const snsNockFactory = (): {
  snsNock: nock.Scope;
  snsEvent: () => SNSMessage & Record<string, string>;
  snsMessage: <T extends Record<string, unknown>>() => BaseEvent<T>;
  snsMessageAttributes: () => Record<string, string>;
} => {
  let snsBody: SNSMessage & Record<string, string>;
  const mockedSNSResponse = `<PublishResponse xmlns="https://sns.amazonaws.com/doc/2010-03-31/">
  <PublishResult>
      <MessageId>${randomUUID()}</MessageId>
  </PublishResult>
  <ResponseMetadata>
      <RequestId>${randomUUID()}</RequestId>
  </ResponseMetadata>
</PublishResponse>
`;

  const snsNock = nock("https://sns.eu-west-1.amazonaws.com")
    .post("/", (body: SNSMessage & Record<string, string>) => {
      snsBody = body;
      return true;
    })
    .times(1)
    .reply(200, mockedSNSResponse);

  const snsEvent = () => snsBody;
  const snsMessage = <T extends Record<string, unknown>>(): BaseEvent<T> =>
    JSON.parse(snsBody.Message) as unknown as BaseEvent<T>;
  const snsMessageAttributes = () =>
    snsMessageAttributesToKeyValueObject(snsBody);

  return {
    snsNock,
    snsEvent,
    snsMessage,
    snsMessageAttributes,
  };
};

/**
 * Handles this data inside the SNS API and transforms it into a key-value map
  {
    "MessageAttributes.entry.1.Name": "event",
    "MessageAttributes.entry.1.Value.DataType": "String",
    "MessageAttributes.entry.1.Value.StringValue": "create_external_bank_account",
    "MessageAttributes.entry.2.Name": "publisher",
    "MessageAttributes.entry.2.Value.DataType": "String",
    "MessageAttributes.entry.2.Value.StringValue": "treasury_service",
    "MessageAttributes.entry.3.Name": "bank",
    "MessageAttributes.entry.3.Value.DataType": "String",
    "MessageAttributes.entry.3.Value.StringValue": "Clearbank"
  }
 * To produce this:
 *
  {
    "bank": "Clearbank",
    "event": "create_external_bank_account",
    "publisher": "treasury_service",
  }
 */
const snsMessageAttributesToKeyValueObject = (
  messageAttributes: Record<string, string>,
) => {
  // Regex with named capture groups allows later destructuring
  const MESSAGE_ATTRIBUTE_REGEX =
    /^MessageAttributes\.entry\.(?<index>\d*)\.(?<type>.*)$/u;
  // Hash table for lookup on index
  const indexNameLookup: Record<string, string> = {};

  // O(n) reduce; with O(1) hash table lookup 🎉
  return Object.keys(messageAttributes).reduce<Record<string, string>>(
    (attributes, key) => {
      // Perform regex matching
      const capture = MESSAGE_ATTRIBUTE_REGEX.exec(key);

      // Ensure non-null and non-undefined in groups
      if (capture && capture.groups) {
        const { index, type } = capture.groups;

        if (parseInt(index) >= 0 && type === "Name") {
          // Populate hash table with names
          indexNameLookup[index] = messageAttributes[key];
        } else if (type !== "Value.DataType") {
          // Assume if this is not a data type or name, it is a value type and map
          // to the value of the key value pair
          const indexName = indexNameLookup[index];
          attributes[indexName] = messageAttributes[key];
        }
      }

      return attributes;
    },
    {},
  );
};
