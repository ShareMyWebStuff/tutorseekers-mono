import { StackContext, Api, EventBus } from "sst/constructs";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Fn } from "aws-cdk-lib";
import { DomainName } from "@aws-cdk/aws-apigatewayv2-alpha";
import { ARecord, RecordTarget, IHostedZone } from "aws-cdk-lib/aws-route53";
import { ApiGatewayv2DomainProperties } from "aws-cdk-lib/aws-route53-targets";
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
import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";

export async function ApiStack({ stack }: StackContext) {
  // const resourceName = resourceNameGenerator(stack.stage, 'mastercard-adapter');
  // const normalisedStage = normaliseStage(stack.stage);

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

  // Create a Lambda function
  const authSignup = new NodejsFunction(stack, "AuthSignup", {
    runtime: Runtime.NODEJS_20_X,
    handler: "handler",
    functionName: "auth-signup",
    entry: "src/service/api/signup.ts",
  });

  const authSignupIntegration = new HttpLambdaIntegration(
    "TemplateIntegration",
    authSignup,
  );

  // Create a resource and method for the API
  httpApi.addRoutes({
    path: "/auth/signup",
    methods: [HttpMethod.POST],
    integration: authSignupIntegration,
  });

  // Output the API endpoint URL
  new CfnOutput(stack, "ApiEndpoint", {
    value: httpApi.apiEndpoint,
  });

  const output = {
    apiUrl: httpApi.apiEndpoint,
  };

  // 👇 Export the outputs in AWS.
  stack.addOutputs(output);

  // 👇 Expose the outputs to other SST stacks.
  return output;
}

// export function API({ stack }: StackContext) {

//     const domainName = "cameronguy.biz";
//   const domainNameDash = domainName.replace(".", "-");

//   // Get the hosted zone
//   const hostedZone = HostedZone.fromLookup(
//     stack,
//     "ts-" + "hosted-zone-lookup-" + domainNameDash,
//     {
//       domainName,
//     },
//   );

//   const certArn = Fn.importValue(
//     "tutorseekers-uk-certificate-cameronguy-biz-arn",
//   );

//   const cert = Certificate.fromCertificateArn(stack, "poo", certArn);

//   const devSubDomain = new DomainName(
//     stack,
//     "ts" + "-api-dev-" + domainNameDash,
//     {
//       domainName: "api-dev." + domainName,
//       certificate: cert,
//     },
//   );

//   // const devSubDomain = addSubDomain(
//   //     this,
//   //     certificate,
//   //     prefix + "-api-dev-" + domainNameDash,
//   //     "api-dev." + domainName,
//   //   );

//   // Create the subdomain route 53 records

//   new ARecord(stack, "ts" + "-api-dev-route53-" + domainNameDash, {
//     zone: hostedZone,
//     recordName: "api-dev." + domainName,
//     target: RecordTarget.fromAlias(
//       new ApiGatewayv2DomainProperties(
//         devSubDomain.regionalDomainName,
//         devSubDomain.regionalHostedZoneId,
//       ),
//     ),
//   });

//   // Create an API Gateway
//   const httpApi = new HttpApi(stack, "MyApi", {
//     defaultDomainMapping: {
//       domainName: devSubDomain,
//     },
//     // createDefaultStage: true,
//     corsPreflight: {
//       allowMethods: [
//         CorsHttpMethod.GET,
//         CorsHttpMethod.POST,
//         CorsHttpMethod.PUT,
//         CorsHttpMethod.PATCH,
//         CorsHttpMethod.DELETE,
//       ],
//       allowCredentials: true,
//       allowOrigins: ["http://localhost:3000"],
//       allowHeaders: [
//         "Content-Type",
//         "X-Amz-Date",
//         "Authorization",
//         "X-Api-Key",
//       ],
//     },
//     // defaultCorsPreflightOptions: {
//     //     allowOrigins: ['http://localhost:3000'],
//     //     allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.POST, CorsHttpMethod.PUT, CorsHttpMethod.PATCH, CorsHttpMethod.DELETE],
//     //     allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
//     //     allowCredentials: true,
//     // },
//     apiName: "TutorSeekersApi",

//     // Not working
//     // disableExecuteApiEndpoint: true,
//   });

//     // Create a Lambda function
//     const myLambda = new NodejsFunction(stack, "MyLambda", {
//       runtime: Runtime.NODEJS_20_X,
//       handler: "handler",
//       functionName: "get-version",
//       entry: "src/service/api/version.ts",
//     });

//     const templateLambdaIntegration = new HttpLambdaIntegration(
//       "TemplateIntegration",
//       myLambda,
//     );

//     // Create a resource and method for the API
//     httpApi.addRoutes({
//       path: "/version",
//       methods: [HttpMethod.GET],
//       integration: templateLambdaIntegration,
//     });

//     // Create a Lambda function
//     const authSignup = new NodejsFunction(stack, "AuthSignup", {
//       runtime: Runtime.NODEJS_20_X,
//       handler: "handler",
//       functionName: "auth-signup",
//       entry: "src/service/api/signup.ts",
//     });

//     const authSignupIntegration = new HttpLambdaIntegration(
//       "TemplateIntegration",
//       authSignup,
//     );

//     // Create a resource and method for the API
//     httpApi.addRoutes({
//       path: "/auth/signup",
//       methods: [HttpMethod.POST],
//       integration: authSignupIntegration,
//     });

//     // Output the API endpoint URL
//     new CfnOutput(stack, "ApiEndpoint", {
//       value: httpApi.apiEndpoint,
//     });

//     const output = {
//       apiUrl: httpApi.apiEndpoint,
//     };

//     // 👇 Export the outputs in AWS.
//     stack.addOutputs(output);

//     // 👇 Expose the outputs to other SST stacks.
//     return output;

//   // const bus = new EventBus(stack, "bus", {
//   //   defaults: {
//   //     retries: 10,
//   //   },
//   // });

//   // const api = new Api(stack, "api", {
//   //   defaults: {
//   //     function: {
//   //       bind: [bus],
//   //     },
//   //   },
//   //   routes: {
//   //     "GET /": "packages/functions/src/lambda.handler",
//   //     "GET /todo": "packages/functions/src/todo.list",
//   //     "POST /todo": "packages/functions/src/todo.create",
//   //   },
//   // });

//   // bus.subscribe("todo.created", {
//   //   handler: "packages/functions/src/events/todo-created.handler",
//   // });

//   // stack.addOutputs({
//   //   ApiEndpoint: api.url,
//   // });
// }
