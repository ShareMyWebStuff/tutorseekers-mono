#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const api_domain_setup_stack_1 = require("../lib/api-domain-setup-stack");
// import { BuildConfig, getConfig } from "../utils/get-config";
const project_config_1 = require("@tutorseekers/project-config");
const app = new cdk.App();
console.log("App");
console.log(app);
// console.log("Config get context");
// console.log(app.node.tryGetContext("setup"));
// console.log("Dev get context");
// console.log(app.node.tryGetContext("env"));
const main = async () => {
    // const buildConfig: BuildConfig = getConfig(app);
    // console.log("Backend");
    // console.log(buildConfig.backend);
    let stackProps = {
        env: {
            region: "eu-west-2",
            account: project_config_1.AWS_ACCOUNT_ID,
        },
    };
    console.log(stackProps);
    console.log(project_config_1.PROJECT_PREFIX);
    // For each region that has backends
    for (const region in project_config_1.BACKENDS) {
        console.log(region);
        console.log(project_config_1.BACKENDS[region]);
        for (let backend of project_config_1.BACKENDS[region]) {
            const stackName = project_config_1.PROJECT_PREFIX +
                "-" +
                backend.domain.replace(".", "-") +
                "-" +
                "-setup-domains-and-certificates";
            console.log(backend.region);
            console.log(backend.domain);
            // eslint-disable-next-line no-new
            new api_domain_setup_stack_1.ApiDomainSetupStack(app, stackName, project_config_1.PROJECT_PREFIX + "-" + backend.region, backend.domain, stackProps);
        }
        // for ( const backend of BACKENDS[region]){
        //   const stackName = PROJECT_PREFIX + "-" + backend
        //   // // eslint-disable-next-line no-new
        //   // new ApiDomainSetupStack(
        //   //   app,
        //   //   stackName,
        //   //   buildConfig.projectPrefix + "-" + domObj.region,
        //   //   domObj.domain,
        //   //   stackProps,
        //   // );
        // }
    }
    // for (const backend in BACKENDS) {
    //   const stackName =
    //   PROJECT_PREFIX + "-" + backend. domObj.domain.replace(".", "-") + "-" + "-setup-domains-and-certificates";
    //         // eslint-disable-next-line no-new
    //         new ApiDomainSetupStack(
    //           app,
    //           stackName,
    //           buildConfig.projectPrefix + "-" + domObj.region,
    //           domObj.domain,
    //           stackProps,
    //         );
    // }
    // // Setup the api domains and certificates
    // for (const region in buildConfig.backend) {
    //   console.log("Region");
    //   console.log(region);
    //   for (const domObj of buildConfig.backend[region]) {
    //     const stackName =
    //       buildConfig.projectPrefix + "-" + domObj.domain.replace(".", "-") + "-" + "-setup-domains-and-certificates";
    //     // eslint-disable-next-line no-new
    //     new ApiDomainSetupStack(
    //       app,
    //       stackName,
    //       buildConfig.projectPrefix + "-" + domObj.region,
    //       domObj.domain,
    //       stackProps,
    //     );
    //   }
    // }
};
main();
