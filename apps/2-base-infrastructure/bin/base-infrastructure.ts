import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {
  AWS_ACCOUNT_ID,
  PROJECT_PREFIX,
  getVpcRegions,
} from "@tutorseekers/project-config";
import { getParameters } from "../utils/getParameters";
import { VpcStack } from "../lib/vpc-stack";
import { DatabaseStack } from "../lib/database-stack";

const app = new cdk.App();

/**
 *
 */
const main = async () => {
  let params = getParameters(app);

  console.log("params");
  console.log(params);

  const vpcs = getVpcRegions();

  if (!vpcs[params.region]) {
    console.log(`Region does not exists (${params.region})`);
    return;
  }

  const { awsRegion, frontend, backend } = vpcs[params.region];

  let stackProps: cdk.StackProps = {
    env: {
      region: "eu-west-2",
      account: AWS_ACCOUNT_ID,
    },
  };

  let stackName =
    PROJECT_PREFIX + "-" + params.region + "-" + params.stage + "-vpc";

  const vpc = new VpcStack(
    app,
    stackName,
    PROJECT_PREFIX,
    params.region,
    params.stage,
    frontend,
    backend,
    stackProps,
  );

  stackName =
    PROJECT_PREFIX +
    "-" +
    params.region +
    "-" +
    params.stage +
    "-create-database";

  console.log("Create database has been commented out");
  console.log("Create database has been commented out");
  console.log("Create database has been commented out");
  console.log("Create database has been commented out");
  console.log("Create database has been commented out");
  console.log("Create database has been commented out");

  // if (backend) {
  //   new DatabaseStack(
  //     app,
  //     stackName,
  //     PROJECT_PREFIX,
  //     params.region,
  //     params.stage,
  //     vpc.vpc,
  //     vpc.databaseSG,
  //     vpc.lambdaSG,
  //     stackProps,
  //   );
  // }

  // // Create the VPC
  // for (const region in vpcs) {
  //   if (params.region === "all" || params.region === region) {
  //     const { awsRegion, frontend, backend } = vpcs[region];

  //     // Set region
  //     stackProps = {
  //       env: {
  //         region: awsRegion,
  //         account: AWS_ACCOUNT_ID,
  //       },
  //     };

  //     const stackName =
  //       PROJECT_PREFIX + "-" + region + "-" + params.stage + "-vpc";

  //     new VpcStack(
  //       app,
  //       stackName,
  //       PROJECT_PREFIX,
  //       region,
  //       params.stage,
  //       frontend,
  //       backend,
  //       stackProps,
  //     );
  //   }
  // }

  // // Create the database for the backend
  // for (const region in vpcs) {
  //   if (params.region === "all" || params.region === region) {
  //     const { awsRegion, backend } = vpcs[region];

  //     // Set region
  //     stackProps = {
  //       env: {
  //         region: awsRegion,
  //         account: AWS_ACCOUNT_ID,
  //       },
  //     };

  //     const stackName =
  //       PROJECT_PREFIX + "-" + region + "-" + params.stage + "-create-database";

  //     if (backend) {
  //       new DatabaseStack(
  //         app,
  //         stackName,
  //         PROJECT_PREFIX,
  //         region,
  //         params.stage,
  //         stackProps,
  //       );
  //     }
  //   }
  // }
};

main();
