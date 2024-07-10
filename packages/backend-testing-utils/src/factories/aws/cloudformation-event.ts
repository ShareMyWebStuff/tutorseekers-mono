import { randomUUID } from "crypto";
import { Factory } from "fishery";
import { CloudFormationCustomResourceEvent } from "aws-lambda";

export const cloudformationEventFactory =
  Factory.define<CloudFormationCustomResourceEvent>(({ transientParams }) => {
    const ServiceToken = transientParams.ServiceToken;

    return {
      LogicalResourceId: "",
      OldResourceProperties: {},
      PhysicalResourceId: "",
      RequestId: randomUUID(),
      RequestType: "Create",
      ResourceProperties: {
        ServiceToken,
      },
      ResourceType: "",
      ResponseURL: "",
      ServiceToken,
      StackId: "",
    };
  });
