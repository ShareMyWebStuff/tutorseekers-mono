"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDomainSetupStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_route53_1 = require("aws-cdk-lib/aws-route53");
const aws_certificatemanager_1 = require("aws-cdk-lib/aws-certificatemanager");
const aws_helper_fns_1 = require("@shared/aws-helper-fns");
class ApiDomainSetupStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, prefix, domainName, props) {
        super(scope, id, props);
        // const prefix = buildConfig.projectPrefix + "-" + location.location;
        const domainNameDash = domainName.replace(".", "-");
        // Get the hosted zone
        const hostedZone = aws_route53_1.HostedZone.fromLookup(this, prefix + "-hosted-zone-lookup-" + domainNameDash, {
            domainName,
        });
        const certificate = new aws_certificatemanager_1.Certificate(this, prefix + "-certificate-" + domainNameDash, {
            certificateName: prefix + "-certificate-" + domainNameDash,
            domainName,
            subjectAlternativeNames: [`*.${domainName}`],
            validation: aws_certificatemanager_1.CertificateValidation.fromDns(hostedZone),
        });
        // Create the subdomains
        const devSubDomain = (0, aws_helper_fns_1.addSubDomain)(this, certificate, prefix + "-api-dev-" + domainNameDash, "api-dev." + domainName);
        const stgSubDomain = (0, aws_helper_fns_1.addSubDomain)(this, certificate, prefix + "-api-stg-" + domainNameDash, "api-stg." + domainName);
        const prdSubDomain = (0, aws_helper_fns_1.addSubDomain)(this, certificate, prefix + "-api-prd-" + domainNameDash, "api." + domainName);
        // Create the subdomain route 53 records
        (0, aws_helper_fns_1.setRoute53Alias)(this, hostedZone, prefix + "-api-dev-route53-" + domainNameDash, "api-dev." + domainName, devSubDomain);
        (0, aws_helper_fns_1.setRoute53Alias)(this, hostedZone, prefix + "-api-stg-route53-" + domainNameDash, "api-stg." + domainName, stgSubDomain);
        (0, aws_helper_fns_1.setRoute53Alias)(this, hostedZone, prefix + "-api-prd-route53-" + domainNameDash, "api." + domainName, prdSubDomain);
    }
}
exports.ApiDomainSetupStack = ApiDomainSetupStack;
