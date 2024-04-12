// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as ProjectInitiation from '../lib/project-initiation-stack';

import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { createVPC, createSecurityGroup, addSubDomain, setRoute53Alias } from "../src/index";

/**
 * Check the template has the AWS services we specified
 */
describe("Check template", () => {
  let template: cdk.assertions.Template;

  /**
   * Set the template up before the tests
   */
  beforeAll(() => {
    const app = new cdk.App();
    const sck = new cdk.Stack(app, "MyTestStack", {});
    const stack = createVPC(sck, "dev", "prefix_");
    // template = Template.fromStack(stack)
    console.log("Template ");
    console.log(template);
  });

  //   /**
  //    * Check the apigateway exists
  //    */
  //   test("Should have an apigateway definition in template", () => {
  //     template.hasResourceProperties("AWS::ApiGateway::RestApi", {
  //       Description: "sms-apigateway",
  //       Name: "sms-api",
  //     });
  //   });

  //   test("Should have only one apigateway template in the template", () => {
  //     template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  //   });

  //   /**
  //    * Check the apigateway sns topic
  //    */
  //   test("Should have an SNS topic for the api in template", () => {
  //     template.hasResourceProperties("AWS::SNS::Topic", {
  //       DisplayName: "api-topic",
  //       TopicName: "api-topic",
  //     });
  //   });

  //   test("Should have two sns topics in the template", () => {
  //     template.resourceCountIs("AWS::SNS::Topic", 2);
  //   });

  /**
   * Check the lambda queue
   */
  test("Should have the lambda queue in template", () => {
    template.hasResourceProperties("AWS::SQS::Queue", {
      QueueName: "lambda-queue",
    });
  });

  //   test("Should only have one queue in the template", () => {
  //     template.resourceCountIs("AWS::SQS::Queue", 1);
  //   });

  //   /**
  //    * Check the lambda function exists
  //    */
  //   test("Should have a lambda function in the template", () => {
  //     template.hasResourceProperties("AWS::Lambda::Function", {
  //       FunctionName: "sendMessage",
  //       Handler: "index.main",
  //       MemorySize: 128,
  //       Timeout: 5,
  //     });
  //   });

  //   /**
  //    * Check the sms sns topic
  //    */
  //   test("Should have an sns topic for sending a sms", () => {
  //     template.hasResourceProperties("AWS::SNS::Topic", {
  //       DisplayName: "sms-topic",
  //       TopicName: "sms-topic",
  //     });
  //   });
});
