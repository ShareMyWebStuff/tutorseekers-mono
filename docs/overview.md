# Project Overview

This monorepo will contain all the code to create a website, including the following

- Create infrastructure
- Ensure domain names point to the correct places
- Create databases
- Populate the database with DDL and data
- Create a nextjs frontend
- Create a AWS REST gateway for the backend
- Release it all with github actions

## Project Construct

The project will be broken down into the following parts

| App Component       | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| Initial Setup       |                                                                                       |
|                     | Create certificates for the domain names                                              |
| Base Infrastructure |                                                                                       |
|                     | Create VPC for the specified region and stage                                         |
|                     | Create Database for the specified region and stage                                    |
|                     | Create certificates for the domain names                                              |
| Backend             |                                                                                       |
|                     | Contains all the code to create the backend, infrastructure and code.                 |
|                     | Create api routes per region / stage e.g. api-dev.domainname.                         |
|                     | Create buckets required for the region / stage                                        |
|                     | Create httpapi required for the region / stage. Includes the lambdas / sqs / sns etc. |
|                     | Create cron jobs required for the region / stage. e.g. clear deleted users.           |
| Frontend Deploy     |                                                                                       |
|                     | Create EC2 instance per region / stage e.g. api-dev.domainname.                       |
|                     | Create NGINX server on EC2 instance                                                   |
|                     | Create static IP address and point domain name to EC2 server.                         |
|                     | Create Route53 records.                                                               |
|                     | Deploy Frontend code to EC2 server.                                                   |
| Frontend            |                                                                                       |
|                     | Contains the frontend code.                                                           |
| Database            |                                                                                       |
|                     | Contains all the DDL, static data to create the database.                             |
| Database Deploy     |                                                                                       |
|                     | Deploys all database items that havent already been deployed.                         |

### Local Running

### Dev / Stg Running

To run in

### Prod Running

## NextJS Install

Had this issue

https://github.com/vercel/next.js/issues/64371

Renamed postcss.config.mjs to postcss.config.cjs

And then change the export from:

export default config;
to:

module.exports = config;

## END

| Initial Setup               |
| --------------------------- |
| Certificate per domain name |

| Base Infrastructure |
| ------------------- |
| Create VPC          |
| Create Database     |

| Backend                   |
| ------------------------- |
| Create API's api.<domain> |
| Create buckets            |
| Create httpapi            |
| Create lambdas            |

## Initial Setup - CDK

This is run with no parameters and creates a stack for each certificate.

## Base Infrastructure - CDK

This is run per region per stage. So it is manually run

cdk deploy -c stage=lcl -c region=uk

## Backend - SST

This is run per region per stage. So it is manually run

## Frontend Deploy - CDK

This is run per region per stage. So it is manually run

We run the following

1.  Initial Setup

- Creates the certificates for our domain names

2.  Base Infrastructure - run per region

- Creates a VPC ( lcl, dev, stg, prd )
- Creates a database in dev / stg or prd

3.  Deploy Database (runs per region )

-

4.  Backend

- Creates the buckets
- HTTPAPI
- Lambdas
- SQS / SNS / Eventbridge

5.  Frontend Deploy

- Creates the EC2 instances

Locally

| Initial Setup |

Locally

Initial Setup

1. Create certificates for all domain names
   - Do the certificates neecd to be created in

Required infrastructure

| AWS Infrastructure           |     |
| ---------------------------- | --- |
| Domain certificates          |     |
|                              |     |
| VPC - Local                  |     |
| VPC - Dev                    |     |
| VPC - Stg                    |     |
| VPC - Prod                   |     |
|                              |     |
| Buckets - per stage eg dave  |     |
| Buckets - Dev                |     |
| Buckets - Stg                |     |
| Buckets - Prd                |     |
|                              |     |
| Database - per stage eg dave |     |
| Database - Dev               |     |
| Database - Stg               |     |
| Database - Prd               |     |
|                              |     |
| Database - per stage eg dave |     |

This project is to create a scalable tutoring website.

| Application         | Run per        | Item            | Functionality                                                             |
| ------------------- | -------------- | --------------- | ------------------------------------------------------------------------- |
| initial-setup       | Once           | Certificate     | A certificate needs to be created per domain name                         |
| initial-setup       | Once           | VPC             | A VPC needs to be created per region / stage                              |
| base-infrastructure | Region / Stage | API route       | Create api routes for each environment api / api-stg / api-dev / api-dave |
| base-infrastructure | Region / Stage | Buckets         | Create buckets for each backend / stage                                   |
| base-infrastructure | Region / Stage | Database        | Create database per backend / stage - use local database                  |
| database-deploy     | Region / Stage | Database Deploy | Deploy database scripts to the database backend / stage                   |
| backend             | Region / Stage | Backend API     | Create API for accessing the backend for each backend / stage             |
| frontend            | Region / Stage | Frontend        | Frontend repository                                                       |
| frontend-deploy     | Region / Stage | Frontend Deploy | Create EC2 server and deploy frontend (dev / stg / prd) not local         |
| local-setup         | Once           | Local setup     | This will load the local environment with images and set db up.           |

## Applications

### Initial Setup

The initial setup creates the infrastructure that is required as a one off. It is envisaged that this will be run every time a new region / domain is added.

This will create a certificate per domain name and create the required VPC's.

Therefore this will contain the following:-

1.  Domain certificates
2.  VPC deployment

**VPC Deployment**
Local - Can only be created in the UK region
Dev - Only one VPC can exist, but it can be in any region
Stg - Only one VPC can exist, but it can be in any region
Prd - A VPC is created in all regions

### Running

We either need to create just the certificates or one or more VPCs with the certificates.

**Create just certificates**
cdk deploy -c mode=certs --all

**Create certificates and one or more VPC's**
cdk deploy -c mode=vpc -c stage=local|dev|stg|prd -c region=all|uk

#### Order

Create the certificates
cdk deploy -c mode=certs --all

Create the local VPC for local development
cdk deploy -c vpc=local -region=uk

Destroy the local VPC to reduce cost
cdk deploy <Stack Name>

When we are ready to run in deveolopment
Create the local VPC
cdk deploy -c vpc=dev -region=uk

When we are ready to run in staging
Create the local VPC
cdk deploy -c vpc=stg -region=uk

When we are ready to run in production
Create the local VPC
cdk deploy -c vpc=prd -region=uk

### Base Infrastructure

The base infrastructure is to be run before an environment can be used. It can be deployed for local environment, dev, staging and production. If run locally the person must use there unique name e.g. github name

1.  Create api routes for local deployments
    - api.domain-name (production)
    - api-stg.domain-name (staging)
    - api-dev.domain-name (development)
    - api-dave.domain-name (local)
2.  Create buckets for the environment
3.  Database
    - Create the database if this isnt local
    - Production - serverless database
    - staging / development - cheap mysql database

### Database Deploy

This deploys all the database definitions, data loads into the database unless they have already been deployed. If run locally it will run against the local database.

### Backend

This will create all the infrastructure for the backend per region / stage (excluding the buckets - these need to be allocated asap incase they are taken).

1.  HTTPAPI
2.  All the routes
3.  Lambda functions required (lambdas will need to connect to local database)

## Frontend

This is the frontend repository, it can be run locally from here. If it needs to be in the cloud then we need to deploy to the cloud.

## Frontend Deployment

This

## NextJS Install

Had this issue

https://github.com/vercel/next.js/issues/64371

Renamed postcss.config.mjs to postcss.config.cjs

And then change the export from:

export default config;
to:

module.exports = config;

## END
