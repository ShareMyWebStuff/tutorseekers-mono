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
 * Regions
 */
const REGION_UK = "uk";
const REGION_IRELAND = "ie";

/**
 * Domain names
 */
const CAMERONGUY_BIZ = 1;
const CAMERONGUY_IE = 2;

/**
 * Define the regions this project is deployed too.
 */
type T_REGIONS = {
  [key: string]: {
    region: string;
    awsRegion: string;
  };
};
export const REGIONS: T_REGIONS = {
  [REGION_UK]: {
    region: REGION_UK,
    awsRegion: "eu-west-2",
  },
  [REGION_IRELAND]: {
    region: REGION_UK,
    awsRegion: "eu-west-1",
  },
};

/**
 * Define the domain names we are using
 */
type T_DOMAINS = {
  [key: number]: {
    id: number;
    domainName: string;
    description: string;
  };
};

export const DOMAINS: T_DOMAINS = {
  [CAMERONGUY_BIZ]: {
    id: CAMERONGUY_BIZ,
    domainName: "cameronguy.biz",
    description: "Test domain name",
  },
  [CAMERONGUY_IE]: {
    id: CAMERONGUY_IE,
    domainName: "cameronguy.ie",
    description: "Test domain name",
  },
};

// Define the website infrastructure from a region perspective
type T_WEBSITE = {
  [key: string]: {
    frontend: {
      name: string;
      subDomain: null;
      domainNameId: number;
      region: string;
      backend: {
        name: string;
        subDomain: string;
        domainNameId: number;
        region: string;
      }[];
    }[];
  };
};

export const WEBSITE_SETUP: T_WEBSITE = {
  [REGION_UK]: {
    frontend: [
      {
        name: "UK Frontend",
        subDomain: null,
        domainNameId: CAMERONGUY_BIZ,
        region: REGION_UK,
        backend: [
          {
            name: "UK Backend API",
            subDomain: "api",
            domainNameId: CAMERONGUY_BIZ,
            region: REGION_UK,
          },
        ],
      },
    ],
  },
};
