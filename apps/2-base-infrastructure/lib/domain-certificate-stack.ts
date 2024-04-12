import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";

/**
 * Creates the stack for creating the certificate for the domain
 */
export class DomainCertificateStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    prefix: string,
    domainName: string,
    props?: StackProps,
  ) {
    super(scope, id, props);

    // const prefix = buildConfig.projectPrefix + "-" + location.location;
    const domainNameDash = domainName.replace(".", "-");

    // Get the hosted zone
    const hostedZone = HostedZone.fromLookup(
      this,
      prefix + "-hosted-zone-lookup-" + domainNameDash,
      {
        domainName,
      },
    );

    // Create the domain certificate
    const certificate: Certificate = new Certificate(
      this,
      prefix + "-certificate-" + domainNameDash,
      {
        certificateName: prefix + "-certificate-" + domainNameDash,
        domainName,
        subjectAlternativeNames: [`*.${domainName}`],
        validation: CertificateValidation.fromDns(hostedZone),
      },
    );
  }
}
