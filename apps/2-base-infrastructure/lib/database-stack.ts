import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import {
  Peer,
  Port,
  SecurityGroup,
  Vpc,
  GatewayVpcEndpointAwsService,
  SubnetType,
} from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export class DatabaseStack extends Stack {
  public readonly vpc: Vpc;
  public readonly lambdaSG: SecurityGroup;
  public readonly databaseSG: SecurityGroup;
  public readonly nextSG: SecurityGroup;

  constructor(
    scope: Construct,
    id: string,
    projectPrefix: string,
    region: string,
    stage: string,
    vpc: Vpc,
    databaseSG: SecurityGroup,
    lambdaSG: SecurityGroup,
    props?: StackProps,
  ) {
    super(scope, id, props);

    console.log(" Create database ...");

    const dbUserName = "admin";
    const dbName = "tutor";

    // Create bucket for database code
    const deployBucket = new s3.Bucket(
      this,
      `${projectPrefix}-${region}-${stage}-deploy-bucket`,
      {
        bucketName: `${projectPrefix}-${region}-${stage}-deploy-bucket`,
        objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
        accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        versioned: false,
        publicReadAccess: false,
        encryption: s3.BucketEncryption.S3_MANAGED,
      },
    );

    const deployBucketPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            "s3:PutObject",
            "s3:GetObject",
            "s3:GetObjectVersion",
            "s3:AbortMultipartUpload",
            "s3:ListBucket",
            "s3:DeleteObject",
            "s3:GetObjectVersion",
            "s3:ListMultipartUploadParts",
            "s3:*",
          ],
          resources: [deployBucket.bucketArn + "/*", deployBucket.bucketArn],
        }),
      ],
    });

    // Create IAM role for lambda
    const deployBucketRole = new iam.Role(
      this,
      `${projectPrefix}-${region}-${stage}-deploy-bucket-role`,
      {
        assumedBy: new iam.ServicePrincipal("rds.amazonaws.com"),
        //   description: "Some old crap",
        inlinePolicies: {
          deployBucketPolicy: deployBucketPolicy,
        },
      },
    );

    /**
     * DATABASE HAS BEEN COMMENTED OUT TO TEST READING FILES
     *
     * FROM HERE +++++
     */

    // const instanceName = `${projectPrefix}-${region}-${stage}-aurora-mysql`;
    // const clusterName = `${projectPrefix}-${region}-${stage}-cluster-aurora-mysql`;

    // const databaseCredentialsSecret = new Secret(
    //   this,
    //   `${projectPrefix}-${region}-${stage}-db-credentials`,
    //   {
    //     secretName: `${instanceName}-credentials`,
    //     generateSecretString: {
    //       secretStringTemplate: JSON.stringify({
    //         username: dbUserName,
    //       }),
    //       excludePunctuation: true,
    //       includeSpace: false,
    //       generateStringKey: "password",
    //     },
    //   },
    // );

    // const dbEngine = rds.DatabaseClusterEngine.auroraMysql({
    //   version: rds.AuroraMysqlEngineVersion.VER_3_04_0,
    // });

    // const parameterGroupForInstance = new rds.ParameterGroup(
    //   this,
    //   `${instanceName}-${dbEngine.engineVersion?.fullVersion}`,
    //   {
    //     engine: dbEngine,
    //     description: `Aurora RDS Instance Parameter Group for database ${instanceName}`,
    //     parameters: {
    //       log_bin_trust_function_creators: "1",
    //       // aurora_load_from_s3_role:
    //       //   "arn:aws:iam::" +
    //       //   this.account +
    //       //   ":role/" +
    //       //   deployBucketRole.roleName,
    //       aws_default_s3_role:
    //         "arn:aws:iam::" +
    //         this.account +
    //         ":role/" +
    //         deployBucketRole.roleName,
    //     },
    //   },
    // );

    // // Create the MySQL aurora cluster
    // const dbCluster = new rds.DatabaseCluster(
    //   this,
    //   `${projectPrefix}-${region}-${stage}-db-cluster`,
    //   {
    //     engine: dbEngine,
    //     credentials: rds.Credentials.fromSecret(databaseCredentialsSecret),
    //     clusterIdentifier: `${projectPrefix}-${region}-${stage}-cluster`,
    //     defaultDatabaseName: dbName,
    //     serverlessV2MaxCapacity: 4,
    //     serverlessV2MinCapacity: 0.5,
    //     writer: rds.ClusterInstance.serverlessV2(
    //       `${projectPrefix}-${region}-${stage}-db-writer`,
    //       {},
    //     ),
    //     readers: [
    //       rds.ClusterInstance.serverlessV2(
    //         `${projectPrefix}-${region}-${stage}-db-reader`,
    //         {},
    //       ),
    //     ],
    //     deletionProtection: false,
    //     removalPolicy: cdk.RemovalPolicy.DESTROY,
    //     securityGroups: [databaseSG],
    //     s3ImportBuckets: [deployBucket],
    //     vpc: vpc,
    //     vpcSubnets: {
    //       subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
    //     },
    //     parameterGroup: parameterGroupForInstance,
    //   },
    // );

    /**
     * TO HERE +++++++
     *
     * BUT ALSO UNCOMMENT THE DATABASE PERMISSIONS AND ENV VARS
     */

    // Create lambda
    const connectToAuroraLambda = new NodejsFunction(
      this,
      `${projectPrefix}-${region}-${stage}-deploy-database-ddl`,
      {
        functionName: `${projectPrefix}-${region}-${stage}-deploy-database-ddl`,
        entry: path.join(__dirname, `../src/deploy-database-ddl/index.ts`),
        runtime: lambda.Runtime.NODEJS_20_X,
        initialPolicy: [
          // Access to the database secret
          // new iam.PolicyStatement({
          //   effect: iam.Effect.ALLOW,
          //   actions: ["secretsmanager:GetSecretValue"],
          //   resources: [databaseCredentialsSecret.secretArn],
          // }),
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["s3:*"],
            resources: [deployBucket.bucketArn, deployBucket.bucketArn + "/*"],
          }),
        ],
        // vpc: vpc,
        // vpcSubnets: {
        //   subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        // },
        // securityGroups: [lambdaSG],
        handler: "main",
        environment: {
          // CLUSTER_ENDPOINT: dbCluster.clusterEndpoint.hostname,
          // CLUSTER_SOCKET: dbCluster.clusterEndpoint.socketAddress,
          // CLUSTER_SECRET_ARN: databaseCredentialsSecret.secretArn,
          DB_NAME: dbName,
          BUCKET_NAME: deployBucket.bucketName,
        },
        timeout: cdk.Duration.seconds(600),
        memorySize: 512,
      },
    );

    deployBucket.grantReadWrite(connectToAuroraLambda);

    // // Stack outputs
    // let exportName: string;

    // // VPC
    // exportName = `${prefix}-${region}-${stage}-vpc-arn`;
    // new CfnOutput(this, exportName, { value: this.vpc.vpcArn, exportName });
    // exportName = `${prefix}-${region}-${stage}-vpc-id`;
    // new CfnOutput(this, exportName, { value: this.vpc.vpcId, exportName });
    // exportName = `${prefix}-${region}-${stage}-vpc-ids`;
    // new CfnOutput(this, exportName, {
    //   value: this.vpc.availabilityZones[0],
    //   exportName,
    // });
  }
}
