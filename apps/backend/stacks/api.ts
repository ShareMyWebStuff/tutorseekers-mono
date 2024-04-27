import { StackContext } from "sst/constructs";
import {
  HttpLambdaIntegration,
  HttpUrlIntegration,
} from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import {
  HttpApi,
  CorsHttpMethod,
  HttpMethod,
} from "@aws-cdk/aws-apigatewayv2-alpha";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { DomainName } from "@aws-cdk/aws-apigatewayv2-alpha";
import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { ARecord, RecordTarget, IHostedZone } from "aws-cdk-lib/aws-route53";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { ApiGatewayv2DomainProperties } from "aws-cdk-lib/aws-route53-targets";
import { Fn } from "aws-cdk-lib";

export async function ApiStack({ stack }: StackContext) {
  console.log(stack);
  const domainName = "cameronguy.biz";
  const domainNameDash = domainName.replace(".", "-");

  // Get the hosted zone
  const hostedZone = HostedZone.fromLookup(
    stack,
    "ts-" + "hosted-zone-lookup-" + domainNameDash,
    {
      domainName,
    },
  );

  const certArn = Fn.importValue(
    "tutorseekers-uk-certificate-cameronguy-biz-arn",
  );

  const cert = Certificate.fromCertificateArn(stack, "poo", certArn);

  const devSubDomain = new DomainName(
    stack,
    "ts" + "-api-dev-" + domainNameDash,
    {
      domainName: "api-dev." + domainName,
      certificate: cert,
    },
  );

  // const devSubDomain = addSubDomain(
  //     this,
  //     certificate,
  //     prefix + "-api-dev-" + domainNameDash,
  //     "api-dev." + domainName,
  //   );

  // Create the subdomain route 53 records

  new ARecord(stack, "ts" + "-api-dev-route53-" + domainNameDash, {
    zone: hostedZone,
    recordName: "api-dev." + domainName,
    target: RecordTarget.fromAlias(
      new ApiGatewayv2DomainProperties(
        devSubDomain.regionalDomainName,
        devSubDomain.regionalHostedZoneId,
      ),
    ),
  });

  // setRoute53Alias(
  //     this,
  //     hostedZone,
  //     prefix + "-api-dev-route53-" + domainNameDash,
  //     "api-dev." + domainName,
  //     devSubDomain,
  //   );

  //     const customDomain = DomainName.fromDomainNameAttributes(stack, "MyDomain", {
  //     name: "api-dev.cameronguy.info",
  //     regionalDomainName: "api-dev.cameronguy.info",
  //     regionalHostedZoneId: "Z07773822Z0KFUEH6BEYR",
  //   });

  // Create an API Gateway
  const httpApi = new HttpApi(stack, "MyApi", {
    defaultDomainMapping: {
      domainName: devSubDomain,
    },
    // createDefaultStage: true,
    corsPreflight: {
      allowMethods: [
        CorsHttpMethod.GET,
        CorsHttpMethod.POST,
        CorsHttpMethod.PUT,
        CorsHttpMethod.PATCH,
        CorsHttpMethod.DELETE,
      ],
      allowCredentials: true,
      allowOrigins: ["http://localhost:3000"],
      allowHeaders: [
        "Content-Type",
        "X-Amz-Date",
        "Authorization",
        "X-Api-Key",
      ],
    },
    // defaultCorsPreflightOptions: {
    //     allowOrigins: ['http://localhost:3000'],
    //     allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.POST, CorsHttpMethod.PUT, CorsHttpMethod.PATCH, CorsHttpMethod.DELETE],
    //     allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
    //     allowCredentials: true,
    // },
    apiName: "TutorSeekersApi",

    // Not working
    // disableExecuteApiEndpoint: true,
  });

  // Create a Lambda function
  const myLambda = new NodejsFunction(stack, "MyLambda", {
    runtime: Runtime.NODEJS_20_X,
    handler: "handler",
    functionName: "get-version",
    entry: "src/service/api/version.ts",
  });

  const templateLambdaIntegration = new HttpLambdaIntegration(
    "TemplateIntegration",
    myLambda,
  );

  // Create a resource and method for the API
  httpApi.addRoutes({
    path: "/version",
    methods: [HttpMethod.GET],
    integration: templateLambdaIntegration,
  });

  httpApi.addRoutes({
    path: "/invoke",
    methods: [HttpMethod.POST],
    integration: templateLambdaIntegration,
  });

  //   // Output the API endpoint URL
  //   new CfnOutput(stack, "ApiEndpoint", {
  //     value: httpApi.apiEndpoint,
  //   });

  //   const output = {
  //     apiUrl: httpApi.apiEndpoint,
  //   };

  // 👇 Export the outputs in AWS.
  //   stack.addOutputs(output);

  //   // 👇 Expose the outputs to other SST stacks.
  //   return output;
}
