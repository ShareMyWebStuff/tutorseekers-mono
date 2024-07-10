import { Factory } from "fishery";
import { SQSEvent } from "aws-lambda";
import { sqsRecordFactory } from "./sqs-record.js";

// SQS Event Factory
//
// Example:
//
// SQSEventFactory.build(
//   {},
//   {
//     associations: SQSRecordFactory.build({ body: "Injected body" })
//   }
// );
export const sqsEventFactory = Factory.define<
  SQSEvent,
  { numberOfRecords: number }
>(({ transientParams, associations }) => {
  // Get more than one record if required
  const { numberOfRecords = 1 } = transientParams;

  return {
    Records:
      associations.Records || sqsRecordFactory.buildList(numberOfRecords),
  };
});
