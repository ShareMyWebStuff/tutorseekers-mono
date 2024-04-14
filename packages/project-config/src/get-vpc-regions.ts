import { REGIONS, WEBSITE_SETUP } from "./config";

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

        if (!vpsToCreate[frontend.region]) {
          vpsToCreate[frontend.region] = {
            ...reg,
            frontend: true,
            backend: false,
          };
        } else {
          const awsRegionExists = !!vpsToCreate[frontend.region];
          if (awsRegionExists) {
            vpsToCreate[frontend.region].frontend = true;
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
          if (!vpsToCreate[backend.region]) {
            vpsToCreate[backend.region] = {
              ...reg,
              frontend: false,
              backend: true,
            };
          } else {
            const awsRegionExists = !!vpsToCreate[backend.region];
            if (awsRegionExists) {
              vpsToCreate[backend.region].backend = true;
            }
          }
        }
      });
    });
  });
  return vpsToCreate;
};
