import { Stack, StackProps } from "aws-cdk-lib";
import {
  Peer,
  Port,
  SecurityGroup,
  Vpc,
  GatewayVpcEndpointAwsService,
  SubnetType,
} from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { createVPC, createSecurityGroup } from "@shared/aws-helper-fns";

export class VpcStack extends Stack {
  public readonly vpc: Vpc;
  public readonly lambdaSG: SecurityGroup;
  public readonly databaseSG: SecurityGroup;
  public readonly nextSG: SecurityGroup;

  constructor(
    scope: Construct,
    id: string,
    prefix: string,
    env: string,
    frontend: boolean,
    backend: boolean,
    props?: StackProps,
  ) {
    super(scope, id, props);

    console.log("VPC creating ...");

    // this.vpc = new Vpc(this, 'VPC', {
    //   cidr: '10.0.0.0/16',
    //   subnetConfiguration: [{ name: 'egress', subnetType: SubnetType.PRIVATE_ISOLATED }], // only one subnet is needed
    //   natGateways: 0, // disable NAT gateways
    // })

    // // Create the VPC
    // // Need atleast  2 AZs - the database will need 2
    // // Should have the same number of NATS as AZ - but can use one to keep the costs down
    // // May need a different cidr per project and environment - 10.1.0.0/16
    // // maxAzs 2
    this.vpc = createVPC(this, prefix, env);

    // Allow S3 endpoint to the VPC if backend
    if (backend) {
      this.vpc.addGatewayEndpoint(prefix + "-S3-Gateway", {
        service: GatewayVpcEndpointAwsService.S3,
        subnets: [
          {
            subnetType: SubnetType.PRIVATE_ISOLATED,
          },
        ],
      });
    }

    //
    // this.vpc.addInterfaceEndpoint("SecretsManagerEndpoint", {
    //   service: InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
    // });

    /**
     * FRONTEND IS NOT REQUIRED DUE TO NEXT SECURITY GROUP
     */
    // Create the security groups for the VPC
    // this.frontendSG = createSecurityGroup(this, this.vpc, env, prefix, {
    //   secGrpName: prefix + `-${env}-frontend-sg`,
    //   secGrpDesc: `${env} frontend security group`,
    //   ingress: [
    //     { peer: Peer.anyIpv4(), port: Port.tcp(80), description: `${env} frontend allows http access from anywhere` },
    //     { peer: Peer.anyIpv6(), port: Port.tcp(80), description: `${env} frontend allows http access from anywhere` },
    //     { peer: Peer.anyIpv4(), port: Port.tcp(22), description: `${env} frontend allows SSH access from anywhere` },
    //   ],
    // });

    console.log("Here 1");
    const lambdaSG = createSecurityGroup(this, this.vpc, env, prefix, {
      secGrpName: prefix + `-${env}-lambda-sg`,
      secGrpDesc: `${env} lambda security group`,
      ingress: [],
    });

    if (frontend) {
      console.log("Here 2");
      // const nextSG =
      createSecurityGroup(this, this.vpc, env, prefix, {
        secGrpName: prefix + `-${env}-next-sg`,
        secGrpDesc: `${env} next security group`,
        ingress: [
          {
            peer: Peer.anyIpv4(),
            port: Port.tcp(80),
            description: `${env} next allows http access from anywhere`,
          },
          {
            peer: Peer.anyIpv6(),
            port: Port.tcp(80),
            description: `${env} next allows http access from anywhere`,
          },
          {
            peer: Peer.anyIpv4(),
            port: Port.tcp(443),
            description: `${env} next allows https access from anywhere`,
          },
          {
            peer: Peer.anyIpv6(),
            port: Port.tcp(443),
            description: `${env} next allows https access from anywhere`,
          },
          {
            peer: Peer.anyIpv4(),
            port: Port.tcp(3000),
            description: `${env} next allows nginx access from anywhere`,
          },
          {
            peer: Peer.anyIpv6(),
            port: Port.tcp(3000),
            description: `${env} next allows nginx access from anywhere`,
          },
          {
            peer: Peer.anyIpv4(),
            port: Port.tcp(22),
            description: `${env} next allows SSH access from anywhere`,
          },
        ],
      });
    }

    if (backend) {
      console.log("Here 3");
      // const databaseSG =
      createSecurityGroup(this, this.vpc, env, prefix, {
        secGrpName: prefix + `-${env}-database-sg`,
        secGrpDesc: `${env} database security group`,
        ingress: [
          {
            peer: this.lambdaSG,
            port: Port.tcp(3306),
            description: `${env} lambda access to the database group`,
          },
          {
            peer: this.nextSG,
            port: Port.tcp(3306),
            description: `${env} frontend access to the database`,
          },
          {
            peer: null,
            port: Port.tcp(3306),
            description: `${env} loop back for database group`,
          },
        ],
      });
    }

    // buildConfig.createdVPCs.push({
    //   region: buildConfig.region,
    //   vpc: this.vpc,
    //   databaseSG: this.databaseSG,
    //   // frontendSG: this.frontendSG,
    //   lambdaSG: this.lambdaSG,
    //   nextSG: this.nextSG,
    // });

    // // Stack outputs
    // let exportName: string;

    // // VPC
    // exportName = prefix + '-' + env + '-' + '-vpc-arn'
    // new CfnOutput(this, exportName, { value: this.vpc.vpcArn, exportName });
    // exportName = prefix + '-' + env + '-' + '-vpc-id'
    // new CfnOutput(this, exportName, { value: this.vpc.vpcId, exportName });

    // // Security Groups
    // exportName = prefix + '-' + env + '-public-sg-id'
    // new CfnOutput(this, exportName, { value: this.frontendSG.securityGroupId, exportName });
    // exportName = prefix + '-' + env + '-lambda-sg-id'
    // new CfnOutput(this, exportName, { value: this.lambdaSG.securityGroupId, exportName });
    // exportName = prefix + '-' + env + '-database-sg-id'
    // new CfnOutput(this, exportName, { value: this.databaseSG.securityGroupId, exportName });
    // exportName = prefix + '-' + env + '-next-sg-id'
    // new CfnOutput(this, exportName, { value: this.nextSG.securityGroupId, exportName });
  }
}
