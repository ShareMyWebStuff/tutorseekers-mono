import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { VpcStack } from "../lib/vpc-stack";
import {
  AWS_ACCOUNT_ID,
  PROJECT_PREFIX,
  getVpcRegions,
} from "@tutorseekers/project-config";
import { getParameters } from "../utils/getParameters";

const app = new cdk.App();

/**
 *
 */
const main = async () => {
  let params = getParameters(app);

  let stackProps: cdk.StackProps = {
    env: {
      region: "eu-west-2",
      account: AWS_ACCOUNT_ID,
    },
  };

  const vpcs = getVpcRegions();

  // Create the VPC
  for (const region in vpcs) {
    if (params.region === "all" || params.region === region) {
      const { awsRegion, frontend, backend } = vpcs[region];

      // Set region
      stackProps = {
        env: {
          region: awsRegion,
          account: AWS_ACCOUNT_ID,
        },
      };

      const stackName =
        PROJECT_PREFIX + "-" + region + "-" + params.stage + "-vpc";

      new VpcStack(
        app,
        stackName,
        PROJECT_PREFIX,
        region,
        frontend,
        backend,
        stackProps,
      );
    }
  }

  // Create the database for the backend
};

main();
