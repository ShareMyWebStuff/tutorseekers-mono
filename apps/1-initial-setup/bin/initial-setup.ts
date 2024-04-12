import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DomainCertificateStack } from "../lib/domain-certificate-stack";
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
};

main();
