import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class BucketStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    prefix: string,
    region: string,
    stage: string,
    frontend: boolean,
    backend: boolean,
    props?: StackProps,
  ) {
    super(scope, id, props);

    console.log("VPC creating ...");

    // // Create bucket for database code
    // const deployBucket = new s3.Bucket(this, prefix + 'DeployBucket', {
    //   objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
    //   blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
    //   accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   autoDeleteObjects: true,
    //   versioned: false,
    //   publicReadAccess: false,
    //   encryption: s3.BucketEncryption.S3_MANAGED,
    // });

    // const deployBucketPolicy = new iam.PolicyDocument({
    //   statements: [
    //     new iam.PolicyStatement({
    //       effect: iam.Effect.ALLOW,
    //       actions: [
    //         "s3:PutObject",
    //         "s3:GetObject",
    //         "s3:AbortMultipartUpload",
    //         "s3:ListBucket",
    //         "s3:DeleteObject",
    //         "s3:GetObjectVersion",
    //         "s3:ListMultipartUploadParts",
    //         "s3:*"
    //       ],
    //       resources: [deployBucket.bucketArn + "/*", deployBucket.bucketArn],
    //       })
    //   ],
    // });

    // // Create IAM role for lambda
    // const deployBucketRole = new iam.Role(this, prefix + 'DeployBucketRole', {
    //   assumedBy: new iam.ServicePrincipal("rds.amazonaws.com"),
    //   description: 'Some old crap',
    //   inlinePolicies: {
    //     deployBucketPolicy: deployBucketPolicy,
    //   },
    // });

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
