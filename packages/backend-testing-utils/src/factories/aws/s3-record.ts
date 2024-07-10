import { Factory } from "fishery";
import { S3EventRecord } from "aws-lambda";

// eslint-disable-next-line no-empty-pattern
export const s3RecordFactory = Factory.define<S3EventRecord>(({}) => ({
  eventVersion: "1",
  eventSource: "source",
  awsRegion: "region",
  eventTime: "time",
  eventName: "name",
  userIdentity: {
    principalId: "principal-id",
  },
  requestParameters: {
    sourceIPAddress: "source-ip-address",
  },
  responseElements: {
    "x-amz-request-id": "request-id",
    "x-amz-id-2": "request-id-2",
  },
  s3: {
    s3SchemaVersion: "1",
    configurationId: "id",
    bucket: {
      name: "",
      ownerIdentity: {
        principalId: "principal-id",
      },
      arn: "arn",
    },
    object: {
      key: "object-name",
      size: 123456,
      eTag: "object-e-tag",
      versionId: undefined,
      sequencer: "sequencer",
    },
  },
  glacierEventData: undefined,
}));
