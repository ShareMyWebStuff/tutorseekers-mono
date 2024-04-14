"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVpcRegions = void 0;
const config_1 = require("./config");
/**
 *
 */
const getVpcRegions = () => {
    const vpsToCreate = {};
    Object.values(config_1.WEBSITE_SETUP).forEach((website) => {
        // Loop throug frontends
        website.frontend.forEach((frontend) => {
            if (frontend.subDomain !== undefined &&
                !!frontend.domainNameId &&
                !!frontend.region) {
                const reg = config_1.REGIONS[frontend.region];
                if (!vpsToCreate[frontend.region]) {
                    vpsToCreate[frontend.region] = {
                        ...reg,
                        frontend: true,
                        backend: false,
                    };
                }
                else {
                    const awsRegionExists = !!vpsToCreate[frontend.region];
                    if (awsRegionExists) {
                        vpsToCreate[frontend.region].frontend = true;
                    }
                }
            }
            // Loop through backends
            frontend.backend.forEach((backend) => {
                // Add backend
                if (backend.subDomain !== undefined &&
                    !!backend.domainNameId &&
                    !!backend.region) {
                    const reg = config_1.REGIONS[backend.region];
                    if (!vpsToCreate[backend.region]) {
                        vpsToCreate[backend.region] = {
                            ...reg,
                            frontend: false,
                            backend: true,
                        };
                    }
                    else {
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
exports.getVpcRegions = getVpcRegions;
//# sourceMappingURL=get-vpc-regions.js.map