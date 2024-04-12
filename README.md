# tutorseekers

yarn init -y

Add the private: true and workspaces to the packages.json

yarn config set nodeLinker node-modules

{
"name": "@tutorseekers/initial-setup1",
"private": true,
"version": "0.0.0",
"type": "module",
"bin": {
"initial-setup": "bin/initial-setup.ts"
},
"scripts": {
"clean": "rimraf ./dist",
"build": "rimraf ./dist && tsc",
"watch": "tsc -w",
"lint": "# eslint .",
"cdk": "cdk",
"test": "jest ",
"test:coverage": "jest --coverage "
},
"devDependencies": {
"@aws-sdk/types": "^3.535.0",
"@tsconfig/node18": "^18.2.4",
"typescript": "^5.4.3"
},
"dependencies": {
"@tutorseekers/logger": "workspace:^",
"@tutorseekers/project-config": "workspace:^",
"aws-cdk-lib": "^2.135.0",
"constructs": "^10.3.0",
"source-map-support": "^0.5.21"
}
}
