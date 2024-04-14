import { DOMAINS, REGIONS, WEBSITE_SETUP } from "./config";

/**
 * get the regions each domain name will require a certificate in
 */
type T_CERT_REGIONS = {
  [key: string]: {
    region: string;
    awsRegion: string;
  }[];
};

export const getCertificateRegions = () => {
  let certRegs: T_CERT_REGIONS = {};

  Object.values(WEBSITE_SETUP).forEach((website) => {
    website.frontend.forEach((frontend) => {
      // Add frontend
      if (
        frontend.subDomain !== undefined &&
        !!frontend.domainNameId &&
        !!frontend.region
      ) {
        if (DOMAINS[frontend.domainNameId] === undefined) {
          console.log(
            `Domain item (${frontend.domainNameId}) is not declared in DOMAINS.`,
          );
          process.exit(0);
        }
        const domainName = DOMAINS[frontend.domainNameId].domainName;
        const reg = REGIONS[frontend.region];

        if (!certRegs[domainName]) {
          certRegs[domainName] = [reg];
        } else {
          const awsRegionExists = certRegs[domainName].find(
            (region) => region.region === reg.region,
          );
          if (!awsRegionExists) {
            certRegs[domainName].push(reg);
          }
        }
      }

      frontend.backend.forEach((backend) => {
        // Add backend
        if (
          backend.subDomain !== undefined &&
          !!backend.domainNameId &&
          !!backend.region
        ) {
          if (DOMAINS[backend.domainNameId] === undefined) {
            console.log(
              `Domain item (${backend.domainNameId}) is not declared in DOMAINS.`,
            );
            process.exit(0);
          }
          const domainName = DOMAINS[backend.domainNameId].domainName;
          const reg = REGIONS[backend.region];

          if (!certRegs[domainName]) {
            certRegs[domainName] = [reg];
          } else {
            const awsRegionExists = certRegs[domainName].find(
              (region) => region.region === reg.region,
            );
            if (!awsRegionExists) {
              certRegs[domainName].push(reg);
            }
          }
        }
      });
    });
  });

  return certRegs;
};
