import { Stack, StackProps, Duration } from "aws-cdk-lib";
import * as path from "path";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import * as R53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { BuildConfig } from "../utils/get-config";
import { readFileSync } from "fs";

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

export class FrontendStack extends Stack {
  constructor(scope: Construct, id: string, region: string, buildConfig: BuildConfig, props?: StackProps) {
    super(scope, id, props);

    const prefix = buildConfig.projectPrefix + "-" + region;

    const foundVpc = buildConfig.createdVPCs.find((vpc) => vpc.region === region);

    if (!foundVpc) {
      throw new Error("No VPC found");
    }

    const vpc = foundVpc.vpc;
    const nextSG = foundVpc.nextSG;

    const nextEc2Role = new Role(this, prefix + "-" + buildConfig.environment + "-next-ec2-role", {
      assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
    });

    nextEc2Role.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["*"],
        actions: ["s3:GetObject"],
      }),
    );

    // Create a static IP address for the frontend
    const nextStaticIP = new ec2.CfnEIP(this, prefix + `-${buildConfig.environment}-next-static-ip`, {
      domain: vpc.vpcId,
    });

    // Ubuntu image
    const machineImage = ec2.MachineImage.genericLinux({
      "eu-west-2": "ami-0eb260c4d5475b901",
      cpuType: ec2.AmazonLinuxCpuType.X86_64,
      // generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
    });

    // Create the EC2 instance
    const nextEc2Instance = new ec2.Instance(this, prefix + "-" + buildConfig.environment + "-next-ec2-instance", {
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      role: nextEc2Role,
      securityGroup: nextSG,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE2,
        // EC2.InstanceSize.MICRO,
        ec2.InstanceSize.SMALL,
      ),

      keyName: "TutorSeekers-co-uk-kp",
      machineImage,
      // machineImage: new ec2.AmazonLinuxImage({
      //   generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      // }),
    });

    const userDataScript = readFileSync(path.join(__dirname, "..", "scripts", "ec2-script.sh"), "utf-8");

    // Create the nginx conf files for each domain name
    const nginxConf = buildConfig.frontend[region].setup.map((domain) => {
      const cmd = `create_nginx_conf "${nextStaticIP.ref}" ${
        buildConfig.environment === "prd" ? domain.feDomain : buildConfig.environment + "." + domain.feDomain
      }`;
      console.log("cmd");
      console.log(cmd);
      return cmd;
    });

    // Create the certbot command to create the certificates for each domain name
    const certbotConf = buildConfig.frontend[region].setup.map((domain) => {
      const cmd = `certbot --nginx -d ${
        buildConfig.environment === "prd" ? domain.feDomain : buildConfig.environment + "." + domain.feDomain
      } -d www.${
        buildConfig.environment === "prd" ? domain.feDomain : buildConfig.environment + "." + domain.feDomain
      } --email dave@harmonydata.co.uk --agree-tos -n`;

      return cmd;
    });

    const usrData1 = userDataScript.replace(/<<NGINX_CONF_FILES>>/g, nginxConf.join("\n"));
    const usrData2 = usrData1.replace(/<<CERTBOT_CONF>>/g, certbotConf.join("\n"));
    const usrData3 = usrData2.replace(/<<APP_NAME>>/g, `${buildConfig.projectPrefix}-${buildConfig.environment}`);
    const usrData4 = usrData3.replace(/<<PROJECT_PREFIX>>/g, buildConfig.projectPrefix);

    nextEc2Instance.addUserData(usrData4);

    // eslint-disable-next-line no-new
    new ec2.CfnEIPAssociation(this, `${prefix}-next-static-ip-association`, {
      eip: nextStaticIP.ref,
      instanceId: nextEc2Instance.instanceId,
    });

    /**
     * Setup the route 53 records for the domain names
     */
    buildConfig.frontend[region].setup.forEach((domain) => {
      const hostedZone = R53.HostedZone.fromLookup(
        this,
        prefix + "-" + buildConfig.environment + "-" + domain.feDomain + "-hosted-zone-lookup-fe",
        {
          domainName: domain.feDomain,
        },
      );

      // Create route 53 records for the domain name and www.domain name
      // eslint-disable-next-line no-new
      new R53.RecordSet(this, prefix + "-" + buildConfig.environment + "-" + domain.feDomain + "-next-alias-record", {
        zone: hostedZone,
        recordName:
          buildConfig.environment === "prd" ? `${domain.feDomain}` : `${buildConfig.environment}.${domain.feDomain}`,
        recordType: R53.RecordType.A,
        ttl: Duration.seconds(900),
        target: R53.RecordTarget.fromIpAddresses(nextStaticIP.ref),
      });

      // eslint-disable-next-line no-new
      new R53.RecordSet(
        this,
        prefix + "-" + buildConfig.environment + "-" + domain.feDomain + "-next-www-alias-record",
        {
          zone: hostedZone,
          recordName:
            buildConfig.environment === "prd"
              ? `www.${domain.feDomain}`
              : `www.${buildConfig.environment}.${domain.feDomain}`,
          recordType: R53.RecordType.A,
          ttl: Duration.seconds(900),
          target: R53.RecordTarget.fromIpAddresses(nextStaticIP.ref),
        },
      );
    });
  }
}
