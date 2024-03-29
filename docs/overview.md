# Project Overview

/apps
    /frontend
    /backend
    /initial-setup
    /base-infrastructure
    /frontend-deploy
/packages
    /frontend
        /frontend-components
    /backend
        /backend-components
        /backend eslint
    /shared
        /common functionality
/config
    /config files
    /config functions to access them





Initial Setup

This is run once and creates the following

- Create certificates for domain names

Base Infrastructure

- Create api sub domains
    -   api-{stage name} if local
    -   api-dev if deployed to a dev environment
    -   api-stg if deployed to stage
    -   api if deployed to production
- Create VPC
    - ts-uk-vpc-local
    - ts-uk-vpc-dev
    - ts-uk-vpc-stg
    - ts-uk-vpc-prd
- Creates buckets
- Create the database
    -   Locally not required as we will try to use local database
    -   Dev - use cheap MySQL database
    -   Stg - use cheap MySQL database
    -   Prd - use serverless MySQL database
- Create database proxy (in later version)
- Load the database

Backend

- Create httpapi gateway
- Break routes into smaller groups
    -   members
    -   scheduler
    -   finance
    -   etc

Frontend Deployment

- Only runs for dev / stg / prod
- Creates EC2 instance
- Deploys frontend code

Frontend

This only contains the frontend code

- Can be run locally (will need to set stage name)



## How I created this

mkdir tutorseekers-mono
cd tutorseekers-mono

yarn init -y
Added workspaces: [ ... ] to it
Added private: true

npx tsc init 

mkdir apps
mkdir apps/backend
mkdir packages
mkdir packages/shared
cd apps/backend
yarn init -y

cd ../../packages/shared
yarn init -y




