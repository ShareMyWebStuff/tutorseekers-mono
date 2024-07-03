// import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
// import { connectToDB } from './db-utils';
// import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3"
// import { listFilesOnS3Bucket } from "./aws-utils";
// import { FileStructure } from './types';
import { DatabaseDeployFile } from "./database-deploy-file";
// import { connectToDB, executeSQL } from "./db-utils";
// import { createDatabaseDeployTable, readDatabaseDeployTable, insertDeployFile } from "./read-database-deploy-table";
import { DatabaseDeployTable } from "./database-deploy-table";

/**
 * Database
 *
 * https://dev.to/aws-builders/how-to-use-secrete-manager-in-aws-lambda-node-js-3j80
 *
 * https://deniapps.com/blog/setup-aws-lambda-to-use-amazon-rds-proxy
 *
 * https://aws.amazon.com/blogs/compute/using-amazon-rds-proxy-with-aws-lambda/
 */
// type FileStructure = {
//   deployId: number;
//   description: string;
//   type: string;
//   filename: string;
//   tablename: string;
//   rowsAffected: string;
// }

// type FileStructure = {
//   deployId: number;

//   // Install script
//   instDesc: string;
//   instFilename: string;
//   instRowCounts: number[];

//   // Uninstall script
//   uninstDesc: string;
//   uninstFilename: string;
//   uninstRowCounts: number[];

//   // Run mode for row
//   mode: string;
// }

// Check database-deploy.txt file exists and read it in

// List all the files on the bucket

// Check install and uninstall files exist

// RowCounts - either blank or an array of numbers

/**
 *
 * Need to be able to list database deployments
 *
 * Need to be able to install and uninstall specific database scriptsWBD
 *
 *
 */

/**
 * TODO
 *
 * Need to run this to create the database
 *
 *
 *
 * - Install script
 * - Uninstall script
 *
 * - Check rows inserted are the same as the file
 *
 * mode
 * - list
 *
 */

export async function main(): Promise<boolean> {
  console.log("Starting");
  try {
    const bucketName = process.env.BUCKET_NAME as string;

    // Initialise the class to reaqd the deploy.txt file on the S3 bucket
    const deployFile = new DatabaseDeployFile(
      bucketName,
      "database-deploy.txt",
    );

    // Reads file, validates file and ensures the files contents exist on the S3 bucket
    await deployFile.checkFile();

    // Initialise the reading from the database deploy table
    const readDB = new DatabaseDeployTable(bucketName, "eu-west-2");

    // Creates the deploy table if it doesnt exist and reads its contents
    await readDB.checkTableExists();

    // Read the database deploy table
    readDB.createRunList(deployFile.getLoadFiles(), deployFile.getMode()); // , deployFile.isModeSet(), deployFile.getMode());

    readDB.showRunList();

    if (deployFile.getMode() === "") {
      await readDB.loadRunList();
    } else if (deployFile.getMode() === "R") {
      await readDB.loadRollbackRunList();
    }

    // // // Initialise the class to read the deploy.txt file on the S3 bucket
    // // const readFile = new ReadDatabaseDeployFile(bucketName, "database-deploy.txt");

    // // // Read the deploy database files contents
    // // const toDeploy = await readFile.readDatabaseDeployFile<FileStructure>();

    // // // Read all the files in the bucket
    // // const fileOnBucket = await listFilesOnS3Bucket( {  Bucket: bucketName } );

    // // // Check the files in the deploy script exist on the bucket
    // // readFile.checkAllsFileExists(toDeploy, fileOnBucket);

    // // Initialise the reading from the database deploy table
    // const readDB = new DatabaseDeployHandle();

    // // Check the deploy table exists and create it if required
    // await readDB.createDatabaseDeployTable();

    // // Read the database deploy table
    // const deployedItems =  await readDB.readDatabaseDeployTable();

    // // Check the items in the database that have been loaded are in the same order as the file
    // const runList = readDB.createRunList(toDeploy, deployedItems, readFile.isModeSet(), readFile.getMode());

    // // If no mode set and no errors exist then load the database
    // if (runList.length > 0) {
    //   // Load the database
    //   await readDB.loadDatabase(runList);
    // }

    // // Read the deploy database files contents
    // const fileContents = await readDatabaseDeployFile<FileStructure>( bucketName, "database-deploy.txt");

    // // Read all the files on the bucket
    // const fileOnBucket = await listFilesOnS3Bucket( {  Bucket: bucketName } );

    // console.log (fileOnBucket)
    // // Check all files exist
    // let filesExist = true;
    // fileContents.forEach( (fileContent) => {

    //   console.log (fileContent)

    //   // Need either the install or uninstall file to exist or both
    //   if (fileContent.instFilename === '' && fileContent.uninstFilename === '') {
    //     console.log (`${fileContent.deployId} - Have no install or uninstall file.`)
    //     filesExist = false;
    //   }

    //   // Check the install file exists on the bucket
    //   if ( fileContent.instFilename !== "" && !fileOnBucket.includes(fileContent.instFilename) ) {
    //     console.log (`${fileContent.deployId} - ${fileContent.instFilename} does not exist.}`)
    //     filesExist = false;
    //   }

    //   // Check the uninstall file exists on the bucket
    //   if ( fileContent.uninstFilename !== "" && !fileOnBucket.includes(fileContent.uninstFilename) ) {
    //     console.log (`${fileContent.deployId} - ${fileContent.uninstFilename} does not exist.}`)
    //     filesExist = false;
    //   }
    // });

    // if ( filesExist){
    //   console.log ('ALL FILES EXISTS!!!!')
    // }

    // Connect to the database
    // const dd = new DatabaseDeployHandle()

    // await dd.connectToDB();

    // let dbRes = await dd.createDatabaseDeployTable();

    // dbRes = await dd.insertDeployFile(1, 'Test', 'install', 'test.sql', 'test', 1);

    // dbRes = await dd.readDatabaseDeployTable();

    // console.log ('DB Res')
    // console.log (dbRes)

    // Check the file contents with the database contents

    // console.log ('Connecting to database')
    // const connection = await connectToDB();
    // if (connection === null) {
    //   console.log ('Error connecting to the database')
    //   return false;
    // }

    // let cunt = await executeSQL(connection, "DROP TABLE IF EXISTS geo_countries;");
    // console.log (cunt)

    // // Create deploy table
    // console.log ('Pooing')
    // let dbRes = await createDatabaseDeployTable();
    // console.log ('Creating Table')
    // console.log (dbRes)

    // // Read the database deploy table
    // dbRes = await readDatabaseDeployTable();
    // console.log ('Reading Table')
    // console.log (dbRes)

    // Check the items in the database that have been loaded are in the same order as the file

    // fileContents.map( async (fileContent) => {
    //   console.log ('File content ...');
    //   console.log (fileContent);

    //   if (fileContent !== null){
    //     console.log ('Checking file exists ...')
    //     const fileExists = await checkS3FileExists( {  Bucket: bucketName, Key: fileContent.filename} );
    //     console.log (`File exists (${fileContent.filename}) - ${fileExists}`)
    //   }

    // });

    // some codes...

    // const config = {}
    // const input = {
    //     Bucket: 'your-bucket',
    //     Key: 'test.txt'
    // }
    // const client = new S3Client(config)
    // const command = new HeadObjectCommand(input)
    // const response = await client.send(command)
    // console.log(response)

    //   // Connect to the database
    //   // const dbConnected = await connectToDB();

    //   // // Read secret for database connection
    //   // const client = new SecretsManagerClient({});
    //   // const secret = await client.send(
    //   //   new GetSecretValueCommand({
    //   //     SecretId: process.env.CLUSTER_SECRET_ARN,
    //   //   }),
    //   // );
    //   // const secretValues = JSON.parse(secret.SecretString ?? "{}");

    //   // console.log(secretValues);

    //   // console.log ('Bucket name');
    //   // console.log (`${process.env.BUCKET_NAME}/geo_countries.csv`);

    //   // console.log("Connect to the  database");
    //   // connection = mysql.createConnection({
    //   //   // host: process.env.CLUSTER_ENDPOINT,
    //   //   host: secretValues.host,
    //   //   user: secretValues.username,
    //   //   password: secretValues.password,
    //   //   database: secretValues.dbname,
    //   //   port: parseInt(secretValues.port),
    //   //   multipleStatements: true,
    //   // });

    //   // // DROP TABLES
    //   // let dbRes = await executeSQL("DROP TABLE IF EXISTS geo_countries;");
    //   // dbRes = await executeSQL("DROP TABLE IF EXISTS geo_postcodes;");
    //   // dbRes = await executeSQL("DROP TABLE IF EXISTS geo_distances;");

    //   // // Create table
    //   // dbRes = await executeSQL(CREATE_GEO_COUNTRIES);
    //   // // console.log("Create geo_countries");
    //   // // console.log(dbRes);
    //   // dbRes = await executeSQL(CREATE_GEO_POSTCODES);
    //   // // console.log("Create geo_postcodes");
    //   // // console.log(dbRes);
    //   // dbRes = await executeSQL(CREATE_GEO_DISTANCES);
    //   // // console.log("Create geo_distances");
    //   // // console.log(dbRes);

    //   // dbRes = await executeSQL('INSERT INTO geo_distances ( from_location_id, to_country_id, to_location_id, distance ) VALUES ( 1, 1, 1, 0.00 );');
    //   // console.log("Create geo_distances");
    //   // console.log(dbRes);

    //   // dbRes = await executeSQL('SELECT * FROM geo_distances;');
    //   // console.log("Create geo_distances");
    //   // console.log(dbRes);

    //   // dbRes = await executeSQL(`GRANT LOAD FROM S3 ON *.* TO 'admin';`);
    //   // console.log("Grant user");
    //   // console.log(dbRes);
    //   // ;

    //   // // const LOAD_TABLE = `GRANT LOAD FROM S3 ON *.* TO '${secretValues.username}@${secretValues.host}';
    //   // // LOAD DATA FROM S3 's3-eu-west-2://cameronguy-uk-dev-database-deploy/geo_countries.csv'
    //   // // GRANT LOAD FROM S3 ON *.* TO '${secretValues.username}@%';
    //   // // LOAD DATA FROM S3 FILE 's3://${process.env.BUCKET_NAME}/geo_countries.csv'
    //   // // GRANT LOAD FROM S3 ON *.* TO '${secretValues.username}@%';
    //   // // SET ROLE ALL;

    //   // const LOAD_COUNTRIES_TABLE = `
    //   // LOAD DATA FROM S3 's3-eu-west-2://${process.env.BUCKET_NAME}/geo_countries.csv'
    //   //   REPLACE INTO TABLE geo_countries
    //   //   CHARACTER SET 'utf8'
    //   //   FIELDS TERMINATED BY ';'
    //   //   ENCLOSED BY '"'
    //   //   LINES TERMINATED BY '\r\n';`;

    //   // console.log("Loading table ...");
    //   // let res = await runSQL(LOAD_COUNTRIES_TABLE);
    //   // console.log(res);

    //   // const LOAD_POSTCODES_TABLE = `
    //   // LOAD DATA FROM S3 's3-eu-west-2://${process.env.BUCKET_NAME}/geo_postcodes.csv'
    //   //   REPLACE INTO TABLE geo_postcodes
    //   //   CHARACTER SET 'utf8'
    //   //   FIELDS TERMINATED BY ';'
    //   //   ENCLOSED BY '"'
    //   //   LINES TERMINATED BY '\r\n';`;

    //   // console.log("Loading table ...");
    //   // res = await runSQL(LOAD_POSTCODES_TABLE);
    //   // console.log(res);

    //   // const LOAD_DISTANCE_TABLE = `
    //   // LOAD DATA FROM S3 's3-eu-west-2://${process.env.BUCKET_NAME}/geo_distances.csv'
    //   //   REPLACE INTO TABLE geo_distances
    //   //   CHARACTER SET 'utf8'
    //   //   FIELDS TERMINATED BY ';'
    //   //   ENCLOSED BY '"'
    //   //   LINES TERMINATED BY '\r\n';`;

    //   // console.log("Loading table ...");
    //   // res = await runSQL(LOAD_DISTANCE_TABLE);
    //   // console.log(res);

    //   // console.log("Selecting ...");
    //   // dbRes = await runSQL( `SELECT TOP 10 * FROM geo_countries;`);
    //   // console.log(dbRes);

    //   // console.log("Selecting ...");
    //   // dbRes = await runSQL( `SELECT TOP 10 * FROM geo_postcodes;`);
    //   // console.log(dbRes);

    //   // console.log("Selecting ...");
    //   // dbRes = await runSQL( `SELECT TOP 10 * FROM geo_distances;`);
    //   // console.log(dbRes);
  } catch (error) {
    console.log("ERROR");
    console.log(error);
  }

  return true;
}
