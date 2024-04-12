"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTENDS = exports.BACKENDS = exports.VPCS = exports.DOMAINS = exports.REGIONS = exports.Stage = exports.PROJECT_PREFIX = exports.AWS_ACCOUNT_ID = void 0;
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
 * Define the regions this project is deployed too.
 *
 */
exports.REGIONS = {
    uk: {
        region: "uk",
        awsRegion: "eu-west-2",
    },
    ie: {
        region: "ie",
        awsRegion: "eu-west-1",
    },
};
/**
 * Define the domain names we are using
 *
 */
var DomainNumber;
(function (DomainNumber) {
    DomainNumber[DomainNumber["CAMERONGUY_BIZ"] = 0] = "CAMERONGUY_BIZ";
})(DomainNumber || (DomainNumber = {}));
exports.DOMAINS = [{ domainName: "cameronguy.biz", deployRegion: "uk" }];
/**
 * Define the VPC's we need to create
 *
 * region      - look up in the REGIONS constant
 * description - description used in AWS to descrtibe the VPC
 */
exports.VPCS = {
    uk: {
        region: "uk",
        description: "UK vpc",
    },
};
/**
 * Defines the backends we need to create
 */
exports.BACKENDS = {
    uk: [
        { region: "uk", domain: exports.DOMAINS[DomainNumber.CAMERONGUY_BIZ].domainName },
    ],
};
/**
 * Defines the frontends and details the backend the frontend connects too
 */
exports.FRONTENDS = {
    uk: {
        region: "uk",
        repo: "frontend-uk",
        setup: [
            {
                frontendDomain: exports.DOMAINS[DomainNumber.CAMERONGUY_BIZ].domainName,
                backend: {
                    domain: exports.DOMAINS[DomainNumber.CAMERONGUY_BIZ].domainName,
                    region: "uk",
                },
            },
        ],
    },
};
//# sourceMappingURL=config.js.map