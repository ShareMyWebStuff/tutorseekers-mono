import { App } from "sst/constructs";
// import { resourceNameGenerator } from '@shieldpay/backend-common';
import { ApiStack } from "./api";
// import { CronStack } from './cron';
// import { EventStack } from './event';
// import { DatabaseStack } from './database';
// import { StorageStack } from './storage';

export default async function main(app: App) {
  console.log(app);
  process.exit(0);

  const resourceNameGenerator = (stage: string, prefix?: string) => {
    return (name: string) => `${prefix ? `${prefix}--` : ""}${name}--${stage}`;
  };

  const resourceName = resourceNameGenerator(app.stage, "ts-uk");

  // 👇 Set default Lambda props, regardless of stack.
  app.setDefaultFunctionProps({
    runtime: "nodejs20.x",
    architecture: "arm_64",
    environment: {
      STAGE: app.stage,
      REGION: app.region,
    },
  });

  // 👇 Set the author tag to the stage name in development mode, or use the
  // GITHUB_AUTHOR tag if it's been explicitly defined.
  //   const authorTag =
  //     app.mode === 'dev'
  //       ? app.stage
  //       : process.env.GITHUB_AUTHOR
  //       ? process.env.GITHUB_AUTHOR
  //       : undefined;

  //   // 👇 Define the shared stack tags.
  //   const stackTags = authorTag ? { GITHUB_AUTHOR: authorTag } : undefined;

  // 👇 Add stacks to the app.
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
    // tags: stackTags,
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
