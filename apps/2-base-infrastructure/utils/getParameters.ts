import { App } from "aws-cdk-lib";

/**
 * Gets the AWS CDK parameteres and checks they are valid
 * @param app
 */
export const getParameters = (app: App) => {
  // Read in the command line configurations
  const stage: string = app.node.tryGetContext("stage");
  const lclStageName: string = app.node.tryGetContext("lclStage");
  let region: string = app.node.tryGetContext("region");

  if (!region || !["all", "uk", "usa", "ie"].includes(region)) {
    console.log("");
    console.log(
      "Usage: cdk deploy -c stage=lcl|dev|stg|prd -c region=all|uk|usa|ie --all",
    );
    console.log("     : lcl can only be run for the uk region.");
    console.log("");
    process.exit(1);
  }

  if (!stage || !["lcl", "dev", "stg", "prd"].includes(stage)) {
    console.log("");
    console.log(
      "Usage: cdk deploy -c stage=lcl|dev|stg|prd [-c lclStage=<local stage name>] -c region=all|uk|usa|ie --all",
    );
    console.log("     : lcl can only be run for the uk region.");
    console.log("");
    process.exit(1);
  }

  if (!stage && stage === "lcl" && !lclStageName) {
    console.log("");
    console.log(
      "Usage: cdk deploy -c stage=lcl|dev|stg|prd [-c lclStage=<local stage name>] -c region=all|uk|usa|ie --all",
    );
    console.log(
      "     : lcl deployments need a local stage name. Could be github account name.",
    );
    console.log("");
  }

  if (stage === "lcl" && region !== "uk") {
    console.log("");
    console.log(
      "Usage: cdk deploy -c stage=lcl|dev|stg|prd -c region=all|uk|usa|ie --all",
    );
    console.log("     : region is not uk for local stage.");
    console.log("");
    process.exit(1);
  }

  return {
    stage,
    region,
    lclStageName,
  };
};
