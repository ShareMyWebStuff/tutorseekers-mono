import { Stack, StackProps, Duration, Fn } from "aws-cdk-lib";
import * as path from "path";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import {
  Role,
  ServicePrincipal,
  PolicyStatement,
  Effect,
} from "aws-cdk-lib/aws-iam";
import * as R53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
// import { BuildConfig } from "../utils/get-config";
import { readFileSync } from "fs";
// import { createBrotliCompress } from "zlib";

/**
 * CONFIGURING NGINX TO HOST
 * https://www.slingacademy.com/article/how-to-deploy-a-next-js-app-on-ubuntu-with-nginx-and-lets-encrypt/?utm_content=cmp-true
 *
 * https://ubuntu.com/tutorials/install-and-configure-nginx#2-installing-nginx
 *
 *
 * https://www.cherryservers.com/blog/how-to-install-and-configure-nginx-on-ubuntu-20-04
 *
 * Ubuntu 22.04
 * https://cloudinfrastructureservices.co.uk/how-to-install-nginx-on-ubuntu-22-04-and-configure/
 *
 * Ubuntu 22.04
 * https://www.youtube.com/watch?v=7YqlP7HYU1g
 *
 */

export class FrontendDeployStack extends Stack {
  // constructor(scope: Construct, id: string, region: string, buildConfig: BuildConfig, props?: StackProps) {
  constructor(
    scope: Construct,
    id: string,
    projectPrefix: string,
    region: string,
    stage: string,
    domains: string[],
    keyName: string,
    certbotEmail: string,
    props?: StackProps,
  ) {
    super(scope, id, props);

    console.log("id");
    console.log(id);
    console.log("projectPrefix");
    console.log(projectPrefix);
    console.log("region");
    console.log(region);
    console.log("stage");
    console.log(stage);
    console.log("domains");
    console.log(domains);
    console.log("keyName");
    console.log(keyName);
    console.log("certbotEmail");
    console.log(certbotEmail);

    // const prefix = projectPrefix + "-" + region;
    console.log("Here 1");

    // Retrieve the vpc
    const vpc = ec2.Vpc.fromLookup(
      this,
      `${projectPrefix}-${region}-${stage}-get-vpc`,
      {
        isDefault: false,
        vpcName: `${projectPrefix}-${region}-${stage}-vpc`,
        tags: {
          "aws:cloudformation:stack-name": `${projectPrefix}-${region}-${stage}-vpc`,
          Stage: stage,
          Region: region,
        },
      },
    );

    console.log("Here 2");

    // Retrieve the security group
    const nextSG = ec2.SecurityGroup.fromLookupByName(
      this,
      `${projectPrefix}-${region}-${stage}-get-next-security-group`,
      `${projectPrefix}-${region}-${stage}-next-sg`,
      vpc,
    );

    console.log("Here 3");

    if (!vpc) {
      throw new Error("No VPC found");
    }

    const nextEc2Role = new Role(
      this,
      `${projectPrefix}-${region}-${stage}-next-ec2-role`,
      {
        assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
      },
    );

    nextEc2Role.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["*"],
        actions: ["s3:GetObject"],
      }),
    );

    // Create a static IP address for the frontend
    const nextStaticIP = new ec2.CfnEIP(
      this,
      `${projectPrefix}-${region}-${stage}-next-static-ip`,
      {
        domain: vpc.vpcId,
      },
    );

    // Ubuntu image
    const machineImage = ec2.MachineImage.genericLinux({
      "eu-west-2": "ami-0eb260c4d5475b901",
      cpuType: ec2.AmazonLinuxCpuType.X86_64,
      // generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
    });

    const publicSubnet = vpc.selectSubnets({
      subnetType: ec2.SubnetType.PUBLIC,
    });

    console.log("**************************************");
    console.log(publicSubnet);

    const keyPair = ec2.KeyPair.fromKeyPairName(
      this,
      `${projectPrefix}-${region}-${stage}-KEY-PAIR`,
      keyName,
    );

    // Create the EC2 instance
    const nextEc2Instance = new ec2.Instance(
      this,
      `${projectPrefix}-${region}-${stage}-next-ec2-instance`,
      {
        vpc,
        // vpcSubnets: publicSubnet[0],
        vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },

        role: nextEc2Role,
        securityGroup: nextSG,
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.BURSTABLE2,
          // EC2.InstanceSize.MICRO,
          ec2.InstanceSize.SMALL,
        ),
        keyName, // : "TutorSeekers-co-uk-kp",
        machineImage,
      },
    );

    const userDataScript = readFileSync(
      path.join(__dirname, "..", "scripts", "ec2-script.sh"),
      "utf-8",
    );

    // Create the nginx conf files for each domain name
    const nginxConf = domains.map((domain) => {
      const cmd = `create_nginx_conf "${nextStaticIP.ref}" ${
        stage === "prd" ? domain : stage + "." + domain
      }`;
      console.log("cmd");
      console.log(cmd);
      return cmd;
    });

    // const certbotConf = ["hello", "goodbye"];

    // Create the certbot command to create the certificates for each domain name
    const certbotConf = domains.map((domain) => {
      const cmd = `certbot --nginx -d ${
        stage === "prd" ? domain : stage + "." + domain
      } -d www.${
        stage === "prd" ? domain : stage + "." + domain
      } --email ${certbotEmail} --agree-tos -n`;

      return cmd;
    });

    const usrData1 = userDataScript.replace(
      /<<NGINX_CONF_FILES>>/g,
      nginxConf.join("\n"),
    );
    const usrData2 = usrData1.replace(
      /<<CERTBOT_CONF>>/g,
      certbotConf.join("\n"),
    );
    const usrData3 = usrData2.replace(
      /<<APP_NAME>>/g,
      `${projectPrefix}-${stage}`,
    );
    const usrData4 = usrData3.replace(/<<PROJECT_PREFIX>>/g, projectPrefix);

    nextEc2Instance.addUserData(usrData4);

    // eslint-disable-next-line no-new
    new ec2.CfnEIPAssociation(
      this,
      `${projectPrefix}-next-static-ip-association`,
      {
        eip: nextStaticIP.ref,
        instanceId: nextEc2Instance.instanceId,
      },
    );

    /**
     * Setup the route 53 records for the domain names
     */
    domains.forEach((domain) => {
      const hostedZone = R53.HostedZone.fromLookup(
        this,
        projectPrefix +
          "-" +
          region +
          "-" +
          stage +
          "-" +
          domain +
          "-hosted-zone-lookup-fe",
        {
          domainName: domain,
        },
      );

      // Create route 53 records for the domain name and www.domain name
      // eslint-disable-next-line no-new
      new R53.RecordSet(
        this,
        projectPrefix +
          "-" +
          region +
          "-" +
          stage +
          "-" +
          domain +
          "-next-alias-record",
        {
          zone: hostedZone,
          recordName: stage === "prd" ? `${domain}` : `${stage}.${domain}`,
          recordType: R53.RecordType.A,
          ttl: Duration.seconds(900),
          target: R53.RecordTarget.fromIpAddresses(nextStaticIP.ref),
        },
      );

      // eslint-disable-next-line no-new
      new R53.RecordSet(
        this,
        projectPrefix +
          "-" +
          region +
          "-" +
          stage +
          "-" +
          domain +
          "-next-www-alias-record",
        {
          zone: hostedZone,
          recordName:
            stage === "prd" ? `www.${domain}` : `www.${stage}.${domain}`,
          recordType: R53.RecordType.A,
          ttl: Duration.seconds(900),
          target: R53.RecordTarget.fromIpAddresses(nextStaticIP.ref),
        },
      );
    });
  }
}
