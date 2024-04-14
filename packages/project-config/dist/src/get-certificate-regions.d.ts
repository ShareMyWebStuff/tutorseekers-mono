/**
 * get the regions each domain name will require a certificate in
 */
type T_CERT_REGIONS = {
    [key: string]: {
        region: string;
        awsRegion: string;
    }[];
};
export declare const getCertificateRegions: () => T_CERT_REGIONS;
export {};
