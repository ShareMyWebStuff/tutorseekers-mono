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
 */
type T_REGIONS = {
    [key: string]: {
        region: string;
        awsRegion: string;
    };
};
export declare const REGIONS: T_REGIONS;
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
export declare const DOMAINS: T_DOMAINS;
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
export declare const WEBSITE_SETUP: T_WEBSITE;
export {};
