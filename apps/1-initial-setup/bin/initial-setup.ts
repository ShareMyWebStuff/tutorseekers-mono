import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DomainCertificateStack } from "../lib/domain-certificate-stack";
import {
  AWS_ACCOUNT_ID,
  PROJECT_PREFIX,
  getCertificateRegions,
} from "@tutorseekers/project-config";
import { getParameters } from "../utils/getParameters";

const app = new cdk.App();

/**
 * Handles creating stacks to create
 * - Certificates for each doomain region in the region its used
 */
const main = async () => {
  let params = getParameters(app);

  // Retrieve the domain names and regions they need certificates created in
  const certs = getCertificateRegions();

  console.log(PROJECT_PREFIX);
  console.log(certs);

  // Create the certificates for the domains in the required regions
  // Domains require certificates in each region they are used
  for (const domainName in certs) {
    certs[domainName].forEach((region) => {
      if (region.region === params.region) {
        let stackProps: cdk.StackProps = {
          env: {
            region: region.awsRegion,
            account: AWS_ACCOUNT_ID,
          },
        };

        const stackName =
          PROJECT_PREFIX +
          "-" +
          region.region +
          "-" +
          domainName.replace(".", "-") +
          "-create-certificate";

        new DomainCertificateStack(
          app,
          stackName,
          PROJECT_PREFIX + "-" + region.region,
          domainName,
          stackProps,
        );
      }
    });
  }
};

main();
