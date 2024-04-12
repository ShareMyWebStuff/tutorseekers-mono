import { Stack, RemovalPolicy } from "aws-cdk-lib";
import * as S3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import { Stage } from "../types";

export enum BucketType {
  PUBLIC = "public",
  PRIVATE = "private",
  CLOUDFRONT_HOSTING = "cloudfront-hosting",
}

/**
 * Sets the bucket parameters for upload buckets (public and private)
 * - Photos
 * - Videos
 * - Secure documents
 *
 * @param bucketName
 * @param domains
 * @param env
 * @returns
 */
const setUploadBucketProps = (bucketName: string, domains: string[], env: Stage) => {
  const cors = domains.map((domain) => {
    return {
      allowedMethods: [S3.HttpMethods.GET, S3.HttpMethods.POST, S3.HttpMethods.PUT, S3.HttpMethods.DELETE],
      allowedOrigins: env === Stage.Production ? [`https://${domain}`] : [`http://localhost:3000`, `https://${domain}`],
      allowedHeaders: ["*"],
    };
  });

  return {
    bucketName,
    objectOwnership: S3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
    blockPublicAccess: S3.BlockPublicAccess.BLOCK_ACLS,
    accessControl: S3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    removalPolicy: env === Stage.Production ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    autoDeleteObjects: env !== Stage.Production,
    versioned: false,
    publicReadAccess: false,
    encryption: S3.BucketEncryption.S3_MANAGED,
    cors,
  };
};

/**
 * Sets the bucket props for the cloudfront hosting bucket
 * @param bucketName
 * @returns
 */
// const setCloudfrontHostingBucketProps = (bucketName: string, env: Stage ) => {
//     return {
//         bucketName,
//         blockPublicAccess: S3.BlockPublicAccess.BLOCK_ALL,
//         removalPolicy: RemovalPolicy.DESTROY,
//         autoDeleteObjects: true,
//         objectOwnership: S3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
//         accessControl: S3.BucketAccessControl.PRIVATE,
//         versioned: false,
//         publicReadAccess: false,
//         encryption: S3.BucketEncryption.S3_MANAGED,
//     }
// }

/**
 *
 * Creates a bucket based on the type of bucket we want to create
 * - Public bucket
 * - Private bucket
 * - Cloudfront hosting bucket
 *
 * @param scope         - The scope of the stack
 * @param bucketType    - The type of bucket
 * @param bucketName    - The name of the bucket
 * @param env           - The build config
 * @returns             - The bucket
 */
export const createBucket = (
  scope: Stack,
  bucketType: BucketType,
  bucketName: string,
  domains: string[],
  env: Stage,
) => {
  console.log(`Create bucket - ${bucketName}`);

  let bucketProps: S3.BucketProps = {};

  switch (bucketType) {
    case BucketType.PUBLIC:
    case BucketType.PRIVATE:
      bucketProps = setUploadBucketProps(bucketName, domains, env);
      break;
    // case BucketType.CLOUDFRONT_HOSTING:
    //     bucketProps = setCloudfrontHostingBucketProps(bucketName, env);
    //     break;
  }

  const bucket = new S3.Bucket(scope, bucketName, bucketProps);

  if (bucketType === BucketType.PUBLIC) {
    bucket.grantRead(new iam.AnyPrincipal());
  }

  return bucket;
};
