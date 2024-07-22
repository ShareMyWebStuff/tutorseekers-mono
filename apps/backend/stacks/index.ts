import { App } from "sst/constructs";
// import { resourceNameGenerator } from '@shieldpay/backend-common';
import { ApiStack } from "./api.js";
// import { CronStack } from './cron.js';
// import { EventStack } from './event.js';
// import { DatabaseStack } from './database.js';
// import { StorageStack } from './storage.js';
import {
  PROJECT_PREFIX,
  WEBSITE_SETUP,
  REGIONS,
  DOMAINS,
} from "@tutorseekers/project-config";

const resourceNameGenerator = (stage: string, prefix?: string) => {
  return (name: string) => `${prefix ? `${prefix}--` : ""}${name}--${stage}`;
};

export default async function main(app: App) {
  // console.log("ENV VARIABLES ");
  // console.log(process.env);

  console.log("App +++++++");
  console.log(app);

  // Check the env variables are correctly set
  const appRegion = process.env.APP_REGION;
  const appAwsRegion = process.env.APP_AWS_REGION;
  const appDomainName = process.env.APP_DOMAIN_NAME;

  if (!appRegion || !appAwsRegion || !appDomainName) {
    console.log(
      "Please set the env file for the APP_REGION | APP_AWS_REGION | APP_DOMAIN_NAME",
    );
    process.exit();
  }

  // Check the region and aws_region match
  if (REGIONS[appRegion].awsRegion !== appAwsRegion) {
    console.log("Env region in not setup in config file to match.");
    process.exit();
  }

  // Check the region is setup on the website config
  if (!WEBSITE_SETUP[appRegion]) {
    console.log("Env region was not found in config.");
    process.exit();
  }

  // Check the domain name exists
  let domainNameId = 0;
  for (const [key, value] of Object.entries(DOMAINS)) {
    if (value.domainName === appDomainName) {
      domainNameId = parseInt(key);
    }
  }
  if (domainNameId === 0) {
    console.log(`Domain name is not configured ${appDomainName}.`);
    process.exit();
  }

  // Check domain is setup
  let matched = false;
  WEBSITE_SETUP[appRegion].frontend.forEach((fe) => {
    fe.backend.forEach((be) => {
      if (be.domainNameId === domainNameId && be.region === appRegion) {
        matched = true;
      }
    });
  });

  if (!matched) {
    console.log(`Region / domain name setup does not match config file.`);
    process.exit();
  }

  // const stageName = app.mode === 'dev' ? app.stage :
  const resourceName = resourceNameGenerator(app.stage, PROJECT_PREFIX);

  // console.log("App +++++++");
  // console.log(app);
  // app.region = eu-west-2
  // app.stage = sharemywebstuff

  // 👇 Set default Lambda props, regardless of stack.
  app.setDefaultFunctionProps({
    runtime: "nodejs20.x",
    architecture: "arm_64",
    environment: {
      STAGE: app.stage,
      REGION: app.region,
    },
  });

  //   // 👇 Set default Lambda props, regardless of stack.
  //   app.setDefaultFunctionProps({
  //     runtime: 'nodejs18.x',
  //     architecture: 'arm_64',
  //     environment: {
  //       STAGE: app.stage,
  //       REGION: app.region,
  //     },
  //   });

  // 👇 Set the author tag to the stage name in development mode, or use the
  // GITHUB_AUTHOR tag if it's been explicitly defined.
  const authorTag =
    app.mode === "dev"
      ? app.stage
      : process.env.GITHUB_AUTHOR
        ? process.env.GITHUB_AUTHOR
        : undefined;

  // 👇 Define the shared stack tags.
  const stackTags = authorTag ? { GITHUB_AUTHOR: authorTag } : undefined;

  //   // 👇 Add stacks to the app.
  //   await app.stack(StorageStack, {
  //     stackName: resourceName('storage'),
  //     tags: stackTags,
  //   });
  //   await app.stack(DatabaseStack, {
  //     stackName: resourceName('database'),
  //     tags: stackTags,
  //   });
  await app.stack(ApiStack, {
    stackName: resourceName("api"),
    tags: stackTags,
  });
  //   await app.stack(EventStack, {
  //     stackName: resourceName('event'),
  //     tags: stackTags,
  //   });
  //   await app.stack(CronStack, {
  //     stackName: resourceName('cron'),
  //     tags: stackTags,
  //   });
}
