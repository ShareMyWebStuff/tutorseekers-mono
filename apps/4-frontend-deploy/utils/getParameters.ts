import { App } from "aws-cdk-lib";

/**
 * Gets the AWS CDK parameteres and checks they are valid
 * @param app
 */
export const getParameters = (app: App) => {
  // Read in the command line configurations
  const stage: string = app.node.tryGetContext("stage");
  let region: string = app.node.tryGetContext("region");

  if (!region || !["all", "uk", "usa", "ie"].includes(region)) {
    console.log("");
    console.log(
      "Usage: cdk deploy -c stage=dev|stg|prd -c region=all|uk|usa|ie --all",
    );
    console.log("     : lcl will not deploy frontend.");
    console.log("");
    process.exit(1);
  }

  if (!stage || !["dev", "stg", "prd"].includes(stage)) {
    console.log("");
    console.log(
      "Usage: cdk deploy -c stage=dev|stg|prd -c region=all|uk|usa|ie --all",
    );
    console.log("     : lcl will not deploy frontend.");
    console.log("");
    process.exit(1);
  }

  return {
    stage,
    region,
  };
};
