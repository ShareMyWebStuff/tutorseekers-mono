type T_VPCS_CREATE = {
    [key: string]: {
        region: string;
        awsRegion: string;
        frontend: boolean;
        backend: boolean;
    };
};
/**
 *
 */
export declare const getVpcRegions: () => T_VPCS_CREATE;
export {};
