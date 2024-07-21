# Creates the Base Infrastructure

Creates the base infrastructure by running the following stacks in.

- vpc-stack
- database-stack
- bucket-stack

##

# Deploy Database DDL

This documents how loading the database ddl works. This loads all the database items from the apps/database project.

In the root directory there is a file called **database-deploy.txt**. This contains what needs to be deployed

Main

The file status below shows that if you set it to R in th4e file, it will rooll the database release back

if ( fileStatus === '' && dbStatus === '' ) runListStatus = 'U';
else if ( fileStatus === '' && dbStatus === 'P' ) runListStatus = 'P';
else if ( fileStatus === '' && dbStatus === 'U' ) runListStatus = 'F';
else if ( fileStatus === 'R' && dbStatus === '' ) runListStatus = 'R';
else if ( fileStatus === 'R' && dbStatus === 'P' ) runListStatus = 'RP';
else if ( fileStatus === 'R' && dbStatus === 'U' ) runListStatus = 'RU';
else runListStatus = 'X';

# Stacks

##

tutorseekers-uk-lcl-vpc
tutorseekers-uk-dev-vpc

#

#

#

#

#

#

#

#

#

#

#

#

#

#

#

#

#

#

# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
