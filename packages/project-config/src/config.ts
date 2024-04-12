/**
 *
 */
export const AWS_ACCOUNT_ID = "216211142709";
export const PROJECT_PREFIX = "tutorseekers";

/**
 * Stages
 */

export enum Stage {
  Local = 10,
  Dev = 20,
  Stage = 30,
  Production = 40,
  NotSet = 99,
}

/**
 * Define the regions this project is deployed too.
 *
 */
export const REGIONS = {
  uk: {
    region: "uk",
    awsRegion: "eu-west-2",
  },
  ie: {
    region: "ie",
    awsRegion: "eu-west-1",
  },
};

/**
 * Define the domain names we are using
 *
 */
enum DomainNumber {
  CAMERONGUY_BIZ = 0,
}

export const DOMAINS = [{ domainName: "cameronguy.biz", deployRegion: "uk" }];

/**
 * Define the VPC's we need to create
 *
 * region      - look up in the REGIONS constant
 * description - description used in AWS to descrtibe the VPC
 */
export const VPCS = {
  uk: {
    region: "uk",
    description: "UK vpc",
  },
};

/**
 * Defines the backends we need to create
 */
export const BACKENDS = {
  uk: [
    { region: "uk", domain: DOMAINS[DomainNumber.CAMERONGUY_BIZ].domainName },
  ],
};

/**
 * Defines the frontends and details the backend the frontend connects too
 */
export const FRONTENDS = {
  uk: {
    region: "uk",
    repo: "frontend-uk",
    setup: [
      {
        frontendDomain: DOMAINS[DomainNumber.CAMERONGUY_BIZ].domainName,
        backend: {
          domain: DOMAINS[DomainNumber.CAMERONGUY_BIZ].domainName,
          region: "uk",
        },
      },
    ],
  },
};
