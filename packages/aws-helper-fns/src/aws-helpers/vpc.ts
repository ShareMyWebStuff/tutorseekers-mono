import { Stack, Tags } from "aws-cdk-lib";
import {
  Vpc,
  SubnetConfiguration,
  SecurityGroup,
  IpAddresses,
  DefaultInstanceTenancy,
  SubnetType,
  IPeer,
  Port,
} from "aws-cdk-lib/aws-ec2";

/**
 * Creates a VPC with 3 subnets for each environment. Each environment will have a public, lambda and database subnet.
 *
 * @param scope
 * @param vpcName
 * @param publicSubnetName
 * @param lambdaSubnetName
 * @param databaseSubnetName
 * @returns
 */

export const SUBNETS = [
  { suffix: "-public", subnetType: SubnetType.PUBLIC },
  { suffix: "-lambda", subnetType: SubnetType.PRIVATE_WITH_EGRESS },
  { suffix: "-database", subnetType: SubnetType.PRIVATE_ISOLATED },
];

export const createVPC = (scope: Stack, env: string, prefix: string) => {
  const subnets: SubnetConfiguration[] = SUBNETS.map((eachSubnet) => {
    return {
      name: prefix + "-" + env + eachSubnet.suffix,
      cidrMask: 24,
      subnetType: eachSubnet.subnetType,
    };
  });

  const vpcName = prefix + "-" + env + "-vpc";
  return new Vpc(scope, vpcName, {
    vpcName,
    ipAddresses: IpAddresses.cidr("10.1.0.0/16"),
    defaultInstanceTenancy: DefaultInstanceTenancy.DEFAULT,
    maxAzs: 2,
    natGateways: 0, // May need to put this to 1 later
    subnetConfiguration: subnets,
  });
};

export type TIngress = {
  peer: IPeer;
  port: Port;
  description: string;
};

/**
 * Create security groups with their ingress rules
 *
 *
 * @param scope
 * @param vpc
 * @param grpName
 * @param grpDesc
 * @param ingress
 * @returns
 */

export type TSecGrpProps = {
  secGrpName: string;
  secGrpDesc: string;
  ingress: {
    peer: IPeer | null; // Null means the peer is the security group we are creating
    port: Port;
    description: string;
  }[];
};

export const createSecurityGroup = (
  scope: Stack,
  vpc: Vpc,
  env: string,
  website: string,
  secGrpProps: TSecGrpProps,
) => {
  // Create security group
  const secGrp = new SecurityGroup(scope, secGrpProps.secGrpName, {
    securityGroupName: secGrpProps.secGrpName,
    vpc,
    allowAllOutbound: true,
    description: secGrpProps.secGrpDesc,
  });

  // Add tags for security group
  Tags.of(secGrp).add("Name", secGrpProps.secGrpName);
  Tags.of(secGrp).add("Site", website);
  Tags.of(secGrp).add("Environment", env);

  // Create security group route table
  secGrpProps.ingress.map((eachIng) => {
    return secGrp.addIngressRule(
      !eachIng.peer ? secGrp : eachIng.peer,
      eachIng.port,
      eachIng.description,
    );
  });

  return secGrp;
};
