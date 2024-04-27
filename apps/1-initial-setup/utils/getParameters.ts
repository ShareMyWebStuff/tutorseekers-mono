import { App } from "aws-cdk-lib";

/**
 * Gets the AWS CDK parameteres and checks they are valid
 * @param app
 */
export const getParameters = (app: App) => {
  // Read in the command line configurations
  let region: string = app.node.tryGetContext("region");

  if (!region || !["uk", "usa", "ie"].includes(region)) {
    console.log("");
    console.log("Usage: cdk deploy -c region=uk|usa|ie --all");
    console.log("");
    process.exit(1);
  }

  return {
    region,
  };
};
