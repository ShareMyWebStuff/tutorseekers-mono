import { SSTConfig } from "sst";
import main from "./stacks/index";
import { PROJECT_PREFIX } from "@tutorseekers/project-config";

export default {
  config(_input) {
    return {
      name: PROJECT_PREFIX,
      region: "eu-west-2",
      poo: "wee wee",
    };
  },
  async stacks(app) {
    // app.stack(main);
    await main(app);
  },
} satisfies SSTConfig;
