import { SSTConfig } from "sst";
import main from "./stacks/index";
// import { API } from "./stacks/MyStack";

// https://docs.sst.dev/configuring-sst

export default {
  config(_input) {
    console.log("HERE ##################");
    console.log(process.env);

    return {
      name: "backend",
      region: "eu-west-2",
    };
  },
  async stacks(app) {
    await main(app);
  },
} satisfies SSTConfig;
