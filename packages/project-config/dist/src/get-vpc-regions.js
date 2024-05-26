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
                const { domainName } = config_1.DOMAINS[frontend.domainNameId];
                if (!vpsToCreate[frontend.region]) {
                    vpsToCreate[frontend.region] = {
                        ...reg,
                        frontendDomains: [domainName],
                        backendDomains: [],
                        frontend: true,
                        backend: false,
                    };
                }
                else {
                    const awsRegionExists = !!vpsToCreate[frontend.region];
                    if (awsRegionExists) {
                        vpsToCreate[frontend.region].frontend = true;
                        // Add doamin name
                        const domainNameExists = vpsToCreate[frontend.region].frontendDomains.find((dn) => dn === domainName);
                        if (!domainNameExists) {
                            vpsToCreate[frontend.region].frontendDomains.push(domainName);
                        }
                    }
                }
            }
            // Loop through backends
            console.log("HERE 00000000000000000000000000000000000000000000");
            console.log(frontend);
            frontend.backend.forEach((backend) => {
                // Add backend
                console.log(backend);
                if (backend.subDomain !== undefined &&
                    !!backend.domainNameId &&
                    !!backend.region) {
                    const reg = config_1.REGIONS[backend.region];
                    const { domainName } = config_1.DOMAINS[backend.domainNameId];
                    if (!vpsToCreate[backend.region]) {
                        vpsToCreate[backend.region] = {
                            ...reg,
                            frontendDomains: [],
                            backendDomains: [domainName],
                            frontend: false,
                            backend: true,
                        };
                    }
                    else {
                        const awsRegionExists = !!vpsToCreate[backend.region];
                        if (awsRegionExists) {
                            vpsToCreate[backend.region].backend = true;
                            // Add doamin name
                            const domainNameExists = vpsToCreate[backend.region].backendDomains.find((dn) => dn === domainName);
                            if (!domainNameExists) {
                                vpsToCreate[backend.region].backendDomains.push(domainName);
                            }
                        }
                    }
                }
            });
        });
    });
    console.log("vpsToCreate");
    console.log(vpsToCreate);
    return vpsToCreate;
};
exports.getVpcRegions = getVpcRegions;
//# sourceMappingURL=get-vpc-regions.js.map