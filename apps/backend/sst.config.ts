import { SSTConfig } from "sst";
import main from "./stacks/index";
// import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "backend",
      region: "eu-west-2",
    };
  },
  async stacks(app) {
    await main(app);
  },
} satisfies SSTConfig;
