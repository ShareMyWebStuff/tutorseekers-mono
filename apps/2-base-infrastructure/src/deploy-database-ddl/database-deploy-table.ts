// import { connectToDB, runSQL } from './db-utils';
import { DbConnection } from './db-utils'
import { readFileIn } from './aws-utils';
import { FileStructure, DeployedItem, RunListItems } from './types';
import { SqlError } from './errorHandler';
// import * as mysql from "mysql2";

/**
 * deploy_id
 * description - description of the database script
 * s3_filename  - the name of the file in the s3 bucket
 * tablename - the tablename if the script loads data in
 * type - LOAD / CREATE / ALTER / INSERT / UPDATE / DELETE / etc
 * no_of_rows_affected - number of rows afftected by running the script
 * 
 */
// DROP TABLE IF EXISTS util_database_deploy;
const CREATE_DATABASE_DEPLOY_TABLE = `CREATE TABLE IF NOT EXISTS util_database_deploy
(
    deploy_id       MEDIUMINT UNSIGNED    NOT NULL,
    description     VARCHAR(100)          NOT NULL,
    filename        VARCHAR(100)          NOT NULL,
    status          CHAR(1)               NOT NULL  DEFAULT 'U',
    created_at      TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (deploy_id)
) ENGINE=InnoDB;`;


export class DatabaseDeployTable {
    private region: string;
    private bucketName: string;
    private dbConnection: DbConnection;
    private deployedItems: DeployedItem[] = [];
    private runList: RunListItems[] = [];

    constructor(bucketName: string, region: string) {
        this.region = region;
        this.bucketName = bucketName;
        this.dbConnection = new DbConnection();
    }

    /**
     * Check the table exists and create it if it doesnt
     * 
     * @returns 
     */
    public checkTableExists = async () => {

        try {
            await this.dbConnection.query(CREATE_DATABASE_DEPLOY_TABLE);
            console.log ('Created table - util_database_deploy.')
                
        } catch (error) {

            if ( error instanceof SqlError ) {
                console.log ('Error Caught')
                console.log (error)            
                throw error
            }
            throw 'Error creating table.'
        }

        try {
            this.deployedItems = [];
            let deployRows = await this.dbConnection.query<DeployedItem[]>(`SELECT * FROM util_database_deploy ORDER BY deploy_id ASC`);
            this.deployedItems = deployRows;

            console.log ('Items deployed in database.')
            console.log (this.deployedItems)
    

            // FIRST
            // let first = await this.dbConnection.execute<DeployedItem[]>(`INSERT INTO util_database_deploy (deploy_id, description, filename, status) VALUES (1, 'Create table', 'create-table.sql', 'U');`);
            // console.log ('first')
            // console.log (first)
            // console.log ('first.rows')
            // console.log (first.rows)
            // 2023-12-19T23:48:07.803Z	a8bff922-b3b0-48d3-bc7c-e4ff9e2fd098	INFO	{
            //     rows: ResultSetHeader {
            //       fieldCount: 0,
            //       affectedRows: 1,
            //       insertId: 0,
            //       info: '',
            //       serverStatus: 2,
            //       warningStatus: 0,
            //       changedRows: 0
            //     },
            //     fields: undefined
            //   }

            // SECOND
            // let second = await this.dbConnection.execute<DeployedItem[]>(`INSERT INTO util_database_deploy (deploy_id, description, filename, status) VALUES (2, 'Create table', 'create-table.sql', 'U'); INSERT INTO util_database_deploy (deploy_id, description, filename, status) VALUES (3, 'Create table', 'create-table.sql', 'U');`);
            // console.log ('second')
            // console.log (second)
            // 2023-12-19T23:48:07.810Z	a8bff922-b3b0-48d3-bc7c-e4ff9e2fd098	INFO	{
            //     rows: [
            //       ResultSetHeader {
            //         fieldCount: 0,
            //         affectedRows: 1,
            //         insertId: 0,
            //         info: '',
            //         serverStatus: 10,
            //         warningStatus: 0,
            //         changedRows: 0
            //       },
            //       ResultSetHeader {
            //         fieldCount: 0,
            //         affectedRows: 1,
            //         insertId: 0,
            //         info: '',
            //         serverStatus: 2,
            //         warningStatus: 0,
            //         changedRows: 0
            //       }
            //     ],
            //     fields: [ undefined, undefined ]
            //   }

            // THIRD
            // let third = await this.dbConnection.execute<DeployedItem[]>(`SELECT * FROM util_database_deploy ORDER BY deploy_id ASC`);
            // console.log ('third')
            // console.log (third)
            // 2023-12-19T23:48:07.815Z	a8bff922-b3b0-48d3-bc7c-e4ff9e2fd098	INFO	{
            //     rows: [
            //       {
            //         deploy_id: 1,
            //         description: 'Create table',
            //         filename: 'create-table.sql',
            //         status: 'U',
            //         created_at: 2023-12-19T23:48:07.000Z
            //       },
            //       {
            //         deploy_id: 2,
            //         description: 'Create table',
            //         filename: 'create-table.sql',
            //         status: 'U',
            //         created_at: 2023-12-19T23:48:07.000Z
            //       },
            //       {
            //         deploy_id: 3,
            //         description: 'Create table',
            //         filename: 'create-table.sql',
            //         status: 'U',
            //         created_at: 2023-12-19T23:48:07.000Z
            //       }
            //     ],
            //     fields: [
            //       `deploy_id` MEDIUMINT UNSIGNED NOT NULL PRIMARY KEY,
            //       `description` VARCHAR(100) NOT NULL,
            //       `filename` VARCHAR(100) NOT NULL,
            //       `status` STRING(4) NOT NULL,
            //       `created_at` TIMESTAMP(19)
            //     ]
            //   }

            // FOURTH
            // let fourth = await this.dbConnection.execute<DeployedItem[]>(`INSERT INTO util_database_deploy (deploy_id, description, filename, status) VALUES (5, 'Create table', 'create-table.sql', 'U');SELECT * FROM util_database_deploy ORDER BY deploy_id ASC;`);
            // console.log ('fourth')
            // console.log (fourth)
            // 2023-12-19T23:48:07.822Z	a8bff922-b3b0-48d3-bc7c-e4ff9e2fd098	INFO	{
            //     rows: [
            //       ResultSetHeader {
            //         fieldCount: 0,
            //         affectedRows: 1,
            //         insertId: 0,
            //         info: '',
            //         serverStatus: 10,
            //         warningStatus: 0,
            //         changedRows: 0
            //       },
            //       [ [Object], [Object], [Object], [Object] ]
            //     ],
            //     fields: [
            //       undefined,
            //       [
            //         `deploy_id` MEDIUMINT UNSIGNED NOT NULL PRIMARY KEY,
            //         `description` VARCHAR(100) NOT NULL,
            //         `filename` VARCHAR(100) NOT NULL,
            //         `status` STRING(4) NOT NULL,
            //         `created_at` TIMESTAMP(19)
            //       ]
            //     ]
            //   }

            // return dbRes;
        } catch (error) {
            if ( error instanceof SqlError ) {
                console.log ('Error Caught')
                console.log (error)            
                throw error
            }
            throw 'Error selecting from table.'
        }
    }

    /**
     * 
     * 
     * @param fileItems 
     * @returns 
     */
    public createRunList = (toDeploy: FileStructure[], mode: string ) => {

        // Check the files already loaded are in the same order as the file
        if ( mode !== 'R' ) {
            this.checkDeploymentsMatchFile(toDeploy);
        }

        // Generate the runlist
        this.generateRunListForDeployment(toDeploy);


        // // If records are set to rollback
        // if (isModeSet && mode !== 'R') {
        //     this.generateRunListForRollback(toDeploy);
        // } else if (!isModeSet) {
        //     this.generateRunListForDeployment(toDeploy);
        // }

    }

    /**
     * Checks that the files already loaded are listed in the correct order in the deploy file. If they are not then the file could be incorrect.
     * 
     * @param fileItems 
     */
    private checkDeploymentsMatchFile = ( fileItems: FileStructure[] ) => {

        // Check the files already loaded are in the same order as the file
        let fileErrors = 0;
        this.deployedItems.forEach((deployedItem, idx) => {
            if (deployedItem.filename !== fileItems[idx].instFilename || deployedItem.deploy_id !== fileItems[idx].deployId) {
                console.log (`Deployed item ${deployedItem.deploy_id} does not match file item ${fileItems[idx].deployId}`)
                fileErrors++;
            }
        })
        if ( fileErrors > 0 ) {
            throw new Error(`The items deployed in the database do not match the items in the deploy file.`);
        }

    };

    /**
     * Search the items in the file, all items that havent been previously loaded will be reloaded / loaded.
     * 
     * @param fileItems 
     */
    private generateRunListForDeployment = (fileItems: FileStructure[]) => {

        this.runList = [];
        const depLen = this.deployedItems.length;
        fileItems.forEach((fileItem, idx) => {

            // statuses 
            // File  DB  
            //              U - unprocessed
            //       P      P - already processed
            //       U      F - load failed (retry)
            // R            R - ignore as it hasnt been loaded to rollback
            // R     P      RP - rollback
            // R     U      RU - rollback

            const fileStatus = fileItem.mode;
            const dbStatus = idx >= depLen ? '' : this.deployedItems[idx].status;
            let runListStatus = '';
            if      ( fileStatus === ''  && dbStatus === ''  ) runListStatus = 'U';
            else if ( fileStatus === ''  && dbStatus === 'P' ) runListStatus = 'P';
            else if ( fileStatus === ''  && dbStatus === 'U' ) runListStatus = 'F';
            else if ( fileStatus === 'R' && dbStatus === ''  ) runListStatus = 'R';
            else if ( fileStatus === 'R' && dbStatus === 'P' ) runListStatus = 'RP';
            else if ( fileStatus === 'R' && dbStatus === 'U' ) runListStatus = 'RU';
            else runListStatus = 'X';

            this.runList.push({
                deployId: fileItem.deployId,
                description: fileItem.instDesc,
                installFilename: fileItem.instFilename,
                rollbackFilename: fileItem.rollbackFilename,
                installRowsAffected: fileItem.instRowCounts !== null &&  fileItem.instRowCounts.length > 0 ? fileItem.instRowCounts : null,
                rollbackRowsAffected: fileItem.rollbackRowCounts !== null && fileItem.rollbackRowCounts.length > 0 ? fileItem.rollbackRowCounts : null,
                status: runListStatus,
            });
    
        });

    };


    // /**
    //  * Search the items in the file, all items that havent been previously loaded will be reloaded / loaded.
    //  * 
    //  * @param fileItems 
    //  */
    // private generateRunListForDeployment = (fileItems: FileStructure[]) => {

    //     this.runList = [];
    //     const depLen = this.deployedItems.length;
    //     fileItems.forEach((fileItem, idx) => {
    //         if ( idx >= depLen || this.deployedItems[idx].status !== 'P' ) {
    //             this.runList.push({
    //                 deployId: fileItem.deployId,
    //                 description: fileItem.instDesc,
    //                 filename: fileItem.instFilename,
    //                 rowsAffected: 0,
    //                 status: 'U',
    //             });
    
    //         }
    //     });

    // };

    // /**
    //  * Search the items in the file, all items that havent been previously loaded will be reloaded / loaded.
    //  * 
    //  * @param fileItems 
    //  */
    // private generateRunListForRollback = (fileItems: FileStructure[]) => {

    //     this.runList = [];
    //     const depLen = this.deployedItems.length;
    //     const fileItemCnt = fileItems.length;

    //     // Reverse the order of the file items
    //     for (let i = fileItemCnt; i > 0; i--) {
    //         const fileItem = fileItems[i-1];

    //         if ( fileItem.mode === 'R' ) {
    //             this.runList.push({
    //                 deployId: fileItem.deployId,
    //                 description: fileItem.rollbackDesc,
    //                 filename: fileItem.rollbackFilename,
    //                 rowsAffected: 0,
    //                 status: 'U',
    //             });
    //         }

    //     }

    // };

    public showRunList = () => {
        console.log ('Run List')
        console.log (this.runList)
    }

    public loadRunList = async ( ) => { 

        for ( const item of this.runList ) {

            // If item has already been loaded
            if ( item.status === 'P' ) {
                console.log (`SKIPPING. ${item.deployId} - ${item.description} has already been loaded`)
                continue;
            }

            // Check if we have already tried to load this item
            const itemExists = this.deployedItems.find( (deployedItem) => deployedItem.deploy_id === item.deployId  );

            if (itemExists) {
                await this.dbConnection.query(`UPDATE util_database_deploy SET status = 'U' WHERE deploy_id = ${item.deployId};`);
            } else {
                await this.dbConnection.query(`INSERT INTO util_database_deploy ( deploy_id, description, filename ) VALUES (${item.deployId}, '${item.description}', '${item.installFilename}' );`);
            }

            // Read the script in from the S3 bucket
            const tmpScript = await readFileIn(this.bucketName, item.installFilename);
            if ( !tmpScript  ) {
                throw new Error (`${item.installFilename} is empty.`)
            }

            const script = tmpScript.replace("<<S3_REGION>>", this.region).replace("<<S3_BUCKET_NAME>>", this.bucketName);


            const dbScript = await this.dbConnection.query( script );

            if ( item.installRowsAffected !== null ) {
                if ( 'affectedRows' in dbScript &&  dbScript.affectedRows !== item.installRowsAffected[0]) {
                    throw new Error (`${item.installFilename} has not loaded the correct number of rows. Expected ${item.installRowsAffected[0]} but got ${dbScript.affectedRows}.`)
                } else if (Array.isArray(dbScript) && dbScript.length !== item.installRowsAffected.length) {
                    throw new Error (`${item.installFilename} has not loaded the correct number of rows. Expected ${item.installRowsAffected} but got ${dbScript}.`)

                }
            }

            await this.dbConnection.query(`UPDATE util_database_deploy SET status = 'P' WHERE deploy_id = ${item.deployId};`);
            console.log (`SUCCESS. ${item.deployId} - ${item.description} has been processed.`, dbScript)

        }

    }

    public loadRollbackRunList = async ( ) => { 

        const runList = this.runList.reverse();

        console.log ('Rolling back runlist')
        console.log (runList)

        for ( const item of this.runList ) {

            // If item has already been loaded
            if ( item.status === 'P' ) {
                break;
            }

            let dbScript;
            if ( ['R', 'RP', 'RU'].includes(item.status) ) {

                if ( item.rollbackFilename !== '' ) {

                    // Read the script in from the S3 bucket
                    const tmpScript = await readFileIn(this.bucketName, item.rollbackFilename);
                    if ( !tmpScript  ) {
                        throw new Error (`${item.rollbackFilename} is empty.`)
                    }

                    const script = tmpScript.replace("<<S3_REGION>>", this.region).replace("<<S3_BUCKET_NAME>>", this.bucketName);

                    dbScript = await this.dbConnection.query( script );

                }

                await this.dbConnection.query(`DELETE FROM util_database_deploy WHERE deploy_id = ${item.deployId};`);

                console.log (`ROLLED BACK - ${item.deployId} - ${item.description}`, dbScript)
            }

        }

    }




    // public loadRunList = async ( ) => { // isModeSet: boolean, mode: string ) => {

    //     // console.log (`Creating run list : mode (${mode}) - isModeSet (${isModeSet})`)

    //     // console.log ('RunList')
    //     // console.log (this.runList)

    //     // For each item in the run list, try to deploy
    //     // this.runList.forEach( async (item) => {

    //     for ( const item of this.runList ) {
    //     // for await (const item of this.runList) {
    //         // For each item in the run list
    //         // const item = this.runList[0];
    //         console.log ('Running command ...')
    //         console.log (item)

    //         console.log ('DeployedItems')
    //         console.log (this.deployedItems)

    //         // Check if we have already tried to load this item
    //         const itemExists = this.deployedItems.find( (deployedItem) => deployedItem.deploy_id === item.deployId  );
                
    //         console.log ('Eh up chuck')

    //         if (itemExists) {
    //             // const sql = `UPDATE util_database_deploy SET status = 'U' WHERE deploy_id = ${item.deployId};`
    //             // console.log ('SQL')
    //             // console.log (sql)
    //             console.log ('UPDATE BEFORE +++++++++++++++++++++')
    //             try {
    //                 const res = await this.dbConnection.query(`UPDATE util_database_deploy SET status = 'U' WHERE deploy_id = ${item.deployId};`);
                    
    //             } catch (error) {
    //                 console.log (error)                    
    //             }
    //             console.log ('UPDATE AFTER +++++++++++++++++++++')
    //             // console.log ('Update ')
    //             // console.log (res)
    //         } else {
    //             // const sql = `INSERT INTO util_database_deploy ( deploy_id, description, filename ) VALUES (${item.deployId}, '${item.description}', '${item.filename}' );`
    //             // console.log ('SQL')
    //             // console.log (sql)
    //             console.log ('INSERT BEFORE +++++++++++++++++++++')
    //             const res = await this.dbConnection.query(`INSERT INTO util_database_deploy ( deploy_id, description, filename ) VALUES (${item.deployId}, '${item.description}', '${item.installFilename}' );`);
    //             console.log ('INSERT AFTER +++++++++++++++++++++')
    //             // console.log ('Insert ')
    //             // console.log (res)
    //         }

    //         // Read the script in from the S3 bucket
    //         const tmpScript = await readFileIn(this.bucketName, item.installFilename);
    //         if ( !tmpScript  ) {
    //             throw new Error (`${item.installFilename} is empty.`)
    //         }

    //         const script = tmpScript.replace("<<S3_REGION>>", this.region).replace("<<S3_BUCKET_NAME>>", this.bucketName);

    //         console.log ('Script')
    //         console.log (script)

    //         const dbScript = await this.dbConnection.query( script );
    //         console.log ('dbScript')
    //         console.log (dbScript)

    //         await this.dbConnection.query<DeployedItem[]>(`UPDATE util_database_deploy SET status = 'P' WHERE deploy_id = ${item.deployId};`);

    //     }
//             const dbDrop = await this.dbConnection.query( 
//                 `DROP PROCEDURE SP_GETMESSAGE;`);
//             console.log ('dbDrop')
//             console.log (dbDrop)
                

//             // Run the script
//             const res = await this.dbConnection.query( 
// `CREATE PROCEDURE SP_GETMESSAGE()
// BEGIN
//     DECLARE email VARCHAR(50);
//     SET email = 'Hello';
//     SELECT * FROM util_database_deploy;
// END;`);
//             console.log ('Res')
//             console.log (res)

//             // If deploy item has a no of rows affected then we need to check it.

//             const res2 = await this.dbConnection.query('CALL SP_GETMESSAGE();')
//             console.log ('Res2')
//             console.log (res2)


    public readDatabaseDeployTable = async () => {
    
        console.log ('readDatabaseDeployTable')
        const results = await this.dbConnection.execute<DeployedItem[]>(`SELECT * FROM util_database_deploy ORDER BY deploy_id ASC`);
        console.log (results)
        return results;
    }

    /**
     * Inserts a item to load. The status is set to U for unprocessed.
     * 
     * 
     * @param deployId 
     * @param description 
     * @param filename 
     * @returns 
     */
    private insertDeployFile = async (deployId: number, description: string, filename: string) => {

        console.log ('insertDeployFile')
        const results = await this.dbConnection.query(`INSERT INTO util_database_deploy (deploy_id, description, filename, status) VALUES (${deployId}, '${description}', '${filename}', 'U');`);
        console.log (results)
        return results;
    }

    private setDeployFileStatus = async (deployId: number, status: string) => {
            
        console.log ('setDeployFileStatus')
        const results = await this.dbConnection.query(`UPDATE util_database_deploy SET status = '${status}' WHERE deploy_id = ${deployId};`);
        console.log (results)
        return results;
    }

}
