"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCertificateRegions = void 0;
const config_1 = require("./config");
const getCertificateRegions = () => {
    let certRegs = {};
    Object.values(config_1.WEBSITE_SETUP).forEach((website) => {
        website.frontend.forEach((frontend) => {
            // Add frontend
            if (frontend.subDomain !== undefined &&
                !!frontend.domainNameId &&
                !!frontend.region) {
                if (config_1.DOMAINS[frontend.domainNameId] === undefined) {
                    console.log(`Domain item (${frontend.domainNameId}) is not declared in DOMAINS.`);
                    process.exit(0);
                }
                const domainName = config_1.DOMAINS[frontend.domainNameId].domainName;
                const reg = config_1.REGIONS[frontend.region];
                if (!certRegs[domainName]) {
                    certRegs[domainName] = [reg];
                }
                else {
                    const awsRegionExists = certRegs[domainName].find((region) => region.region === reg.region);
                    if (!awsRegionExists) {
                        certRegs[domainName].push(reg);
                    }
                }
            }
            frontend.backend.forEach((backend) => {
                // Add backend
                if (backend.subDomain !== undefined &&
                    !!backend.domainNameId &&
                    !!backend.region) {
                    if (config_1.DOMAINS[backend.domainNameId] === undefined) {
                        console.log(`Domain item (${backend.domainNameId}) is not declared in DOMAINS.`);
                        process.exit(0);
                    }
                    const domainName = config_1.DOMAINS[backend.domainNameId].domainName;
                    const reg = config_1.REGIONS[backend.region];
                    if (!certRegs[domainName]) {
                        certRegs[domainName] = [reg];
                    }
                    else {
                        const awsRegionExists = certRegs[domainName].find((region) => region.region === reg.region);
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
exports.getCertificateRegions = getCertificateRegions;
//# sourceMappingURL=get-certificate-regions.js.map