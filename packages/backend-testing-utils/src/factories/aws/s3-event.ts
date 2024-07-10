import { Factory } from "fishery";
import { S3Event } from "aws-lambda";
import { s3RecordFactory } from "./s3-record.js";

type S3Associations = {
  Records?: S3Event["Records"];
};

type S3TransientParams = {
  numberOfRecords?: number;
};

type S3EventFactoryBuildFunctionParameters = {
  transientParams: S3TransientParams;
  associations: S3Associations;
};

// S3 Event Factory
//
// Example:
//
// S3EventFactory.build(
//    S3RecordFactory.build({ s3: { bucket: { name: "my-bucket-name" } } })
// );
export const s3EventFactory = Factory.define<S3Event, S3TransientParams>(
  ({
    transientParams,
    associations,
  }: S3EventFactoryBuildFunctionParameters) => {
    const { numberOfRecords = 1 } = transientParams;

    return {
      Records:
        associations.Records || s3RecordFactory.buildList(numberOfRecords),
    };
  },
);
