import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FrontendDeployStack } from "../lib/frontend-deploy";
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
  console.log("params");
  console.log(params);

  let stackProps: cdk.StackProps = {
    env: {
      region: "eu-west-2",
      account: AWS_ACCOUNT_ID,
    },
  };

  const vpcs = getVpcRegions();
  console.log("vpcs");
  console.log(vpcs);

  // Create the VPC
  for (const region in vpcs) {
    if (params.region === "all" || params.region === region) {
      const { awsRegion, frontendDomains } = vpcs[region];

      // Set region
      stackProps = {
        env: {
          region: awsRegion,
          account: AWS_ACCOUNT_ID,
        },
      };

      const stackName =
        PROJECT_PREFIX + "-" + region + "-" + params.stage + "-frontend-deploy";

      new FrontendDeployStack(
        app,
        stackName,
        PROJECT_PREFIX,
        region,
        params.stage,
        frontendDomains,
        "TutorSeekers-co-uk-kp",
        "dave@harmonydata.co.uk",
        stackProps,
      );

      //   new VpcStack(
      //     app,
      //     stackName,
      //     PROJECT_PREFIX,
      //     region,
      //     frontend,
      //     backend,
      //     stackProps,
      //   );
    }
  }
};

main();
