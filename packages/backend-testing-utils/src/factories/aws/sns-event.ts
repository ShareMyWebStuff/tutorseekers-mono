import { Factory } from "fishery";
import { SNSEvent } from "aws-lambda";
import { snsRecordFactory } from "./sns-record.js";

// sns Event Factory
//
// Example:
//
// snsEventFactory.build(
//   {},
//   {
//     associations: snsRecordFactory.build({ body: "Injected body" })
//   }
// );
export const snsEventFactory = Factory.define<
  SNSEvent,
  { numberOfRecords: number }
>(({ transientParams, associations }) => {
  // Get more than one record if required
  const { numberOfRecords = 1 } = transientParams;

  return {
    Records:
      associations.Records || snsRecordFactory.buildList(numberOfRecords),
  };
});
