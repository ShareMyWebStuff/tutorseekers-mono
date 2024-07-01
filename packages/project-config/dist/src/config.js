"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBSITE_SETUP = exports.DOMAINS = exports.REGIONS = exports.Stage = exports.PROJECT_PREFIX = exports.AWS_ACCOUNT_ID = void 0;
/**
 *
 */
exports.AWS_ACCOUNT_ID = "216211142709";
exports.PROJECT_PREFIX = "tutorseekers";
/**
 * Stages
 */
var Stage;
(function (Stage) {
    Stage[Stage["Local"] = 10] = "Local";
    Stage[Stage["Dev"] = 20] = "Dev";
    Stage[Stage["Stage"] = 30] = "Stage";
    Stage[Stage["Production"] = 40] = "Production";
    Stage[Stage["NotSet"] = 99] = "NotSet";
})(Stage || (exports.Stage = Stage = {}));
/**
 * Regions
 */
const REGION_UK = "uk";
const REGION_IRELAND = "ie";
/**
 * Domain names
 */
const CAMERONGUY_BIZ = 1;
const CAMERONGUY_IE = 2;
const CAMERONGUY_INFO = 3;
exports.REGIONS = {
    [REGION_UK]: {
        region: REGION_UK,
        awsRegion: "eu-west-2",
    },
    [REGION_IRELAND]: {
        region: REGION_UK,
        awsRegion: "eu-west-1",
    },
};
exports.DOMAINS = {
    [CAMERONGUY_BIZ]: {
        id: CAMERONGUY_BIZ,
        domainName: "cameronguy.biz",
        description: "Test domain name",
    },
    [CAMERONGUY_IE]: {
        id: CAMERONGUY_IE,
        domainName: "cameronguy.ie",
        description: "Test domain name",
    },
    [CAMERONGUY_INFO]: {
        id: CAMERONGUY_INFO,
        domainName: "cameronguy.info",
        description: "Test domain name",
    },
};
exports.WEBSITE_SETUP = {
    [REGION_UK]: {
        frontend: [
            {
                name: "UK Frontend",
                subDomain: null,
                domainNameId: CAMERONGUY_INFO,
                region: REGION_UK,
                backend: [
                    {
                        name: "UK Backend API",
                        subDomain: "api",
                        domainNameId: CAMERONGUY_BIZ,
                        region: REGION_UK,
                    },
                ],
            },
        ],
    },
};
//# sourceMappingURL=config.js.map