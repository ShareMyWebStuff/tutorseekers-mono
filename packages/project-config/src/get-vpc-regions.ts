import { REGIONS, DOMAINS, WEBSITE_SETUP } from "./config";

type T_VPCS_CREATE = {
  [key: string]: {
    region: string;
    awsRegion: string;
    frontendDomains: string[];
    backendDomains: string[];
    frontend: boolean;
    backend: boolean;
  };
};

/**
 *
 */
export const getVpcRegions = () => {
  const vpsToCreate: T_VPCS_CREATE = {};

  Object.values(WEBSITE_SETUP).forEach((website) => {
    // Loop throug frontends
    website.frontend.forEach((frontend) => {
      if (
        frontend.subDomain !== undefined &&
        !!frontend.domainNameId &&
        !!frontend.region
      ) {
        const reg = REGIONS[frontend.region];
        const { domainName } = DOMAINS[frontend.domainNameId];

        if (!vpsToCreate[frontend.region]) {
          vpsToCreate[frontend.region] = {
            ...reg,
            frontendDomains: [domainName],
            backendDomains: [],
            frontend: true,
            backend: false,
          };
        } else {
          const awsRegionExists = !!vpsToCreate[frontend.region];
          if (awsRegionExists) {
            vpsToCreate[frontend.region].frontend = true;

            // Add doamin name
            const domainNameExists = vpsToCreate[
              frontend.region
            ].frontendDomains.find((dn) => dn === domainName);
            if (!domainNameExists) {
              vpsToCreate[frontend.region].frontendDomains.push(domainName);
            }
          }
        }
      }

      // Loop through backends
      frontend.backend.forEach((backend) => {
        // Add backend
        if (
          backend.subDomain !== undefined &&
          !!backend.domainNameId &&
          !!backend.region
        ) {
          const reg = REGIONS[backend.region];
          const { domainName } = DOMAINS[backend.domainNameId];

          if (!vpsToCreate[backend.region]) {
            vpsToCreate[backend.region] = {
              ...reg,
              frontendDomains: [],
              backendDomains: [domainName],
              frontend: false,
              backend: true,
            };
          } else {
            const awsRegionExists = !!vpsToCreate[backend.region];
            if (awsRegionExists) {
              vpsToCreate[backend.region].backend = true;

              // Add doamin name
              const domainNameExists = vpsToCreate[
                backend.region
              ].backendDomains.find((dn) => dn === domainName);
              if (!domainNameExists) {
                vpsToCreate[backend.region].backendDomains.push(domainName);
              }
            }
          }
        }
      });
    });
  });
  return vpsToCreate;
};
