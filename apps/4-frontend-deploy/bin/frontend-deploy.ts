import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DomainCertificateStack } from "../lib/domain-certificate-stack";
import { VpcStack } from "../lib/vpc-stack";
import {
  AWS_ACCOUNT_ID,
  PROJECT_PREFIX,
  VPCS,
  REGIONS,
  DOMAINS,
} from "@tutorseekers/project-config";

const app = new cdk.App();

/**
 *
 */
const main = async () => {
  let stackProps: cdk.StackProps = {
    env: {
      region: "eu-west-2",
      account: AWS_ACCOUNT_ID,
    },
  };

  console.log(stackProps);
  console.log(PROJECT_PREFIX);

  // Create the certificates for the domains
  for (const dom in DOMAINS) {
    const stackName =
      PROJECT_PREFIX +
      "-" +
      DOMAINS[dom].domainName.replace(".", "-") +
      "-create-domains-certificate";

    new DomainCertificateStack(
      app,
      stackName,
      PROJECT_PREFIX + "-" + DOMAINS[dom].deployRegion,
      DOMAINS[dom].domainName,
      stackProps,
    );
  }

  // // For each region that has backends
  // for (const region in BACKENDS) {
  //   console.log(region);
  //   console.log(BACKENDS[region]);

  //   for (let backend of BACKENDS[region]) {
  //     const stackName =
  //       PROJECT_PREFIX +
  //       "-" +
  //       backend.domain.replace(".", "-") +
  //       "-setup-domains-and-certificates";
  //     console.log(backend.region);
  //     console.log(backend.domain);

  //     new DomainCertificateStack(
  //       app,
  //       stackName,
  //       PROJECT_PREFIX + "-" + backend.region,
  //       backend.domain,
  //       stackProps,
  //     );
  //   }
  // }

  // Create VPC's
  for (const region in VPCS) {
    // const awsRegion = REGIONS.find(
    //   (r) => r.region === region,
    // )?.awsRegion;
    const awsRegion = REGIONS[region].awsRegion;

    // Set region
    stackProps = {
      env: {
        region: awsRegion,
        account: AWS_ACCOUNT_ID,
      },
    };

    ["lcl", "dev", "stg", "prd"].forEach((stage) => {
      const stackName = PROJECT_PREFIX + "-" + stage + "-" + region + "-vpc";
      // eslint-disable-next-line no-new
      new VpcStack(app, stackName, PROJECT_PREFIX, region, stackProps);
    });
  }
};

main();
