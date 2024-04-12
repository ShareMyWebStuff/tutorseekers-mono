/**
 *
 */
export declare const AWS_ACCOUNT_ID = "216211142709";
export declare const PROJECT_PREFIX = "tutorseekers";
/**
 * Stages
 */
export declare enum Stage {
    Local = 10,
    Dev = 20,
    Stage = 30,
    Production = 40,
    NotSet = 99
}
/**
 * Define the regions this project is deployed too.
 *
 */
export declare const REGIONS: {
    uk: {
        region: string;
        awsRegion: string;
    };
    ie: {
        region: string;
        awsRegion: string;
    };
};
export declare const DOMAINS: {
    domainName: string;
    deployRegion: string;
}[];
/**
 * Define the VPC's we need to create
 *
 * region      - look up in the REGIONS constant
 * description - description used in AWS to descrtibe the VPC
 */
export declare const VPCS: {
    uk: {
        region: string;
        description: string;
    };
};
/**
 * Defines the backends we need to create
 */
export declare const BACKENDS: {
    uk: {
        region: string;
        domain: string;
    }[];
};
/**
 * Defines the frontends and details the backend the frontend connects too
 */
export declare const FRONTENDS: {
    uk: {
        region: string;
        repo: string;
        setup: {
            frontendDomain: string;
            backend: {
                domain: string;
                region: string;
            };
        }[];
    };
};
