import { RowDataPacket } from "mysql2";

/**
 * File structure for the deploy file
 */
export type FileStructure = {
    deployId: number;
  
    // Install script
    instDesc: string;
    instFilename: string;
    instRowCounts: number[];
  
    // Uninstall script
    rollbackDesc: string;
    rollbackFilename: string;
    rollbackRowCounts: number[];

    // Data file
    dataFilename: string;
  
    // Run mode for row
    mode: string;
  };

export interface DeployedItem extends RowDataPacket {
    deploy_id: number;
    description: string;
    filename: string;
    status: string;
    created_at: Date;
};

/**
 * 
 */
export type RunListItems = {
    deployId: number;
    description: string;
    installFilename: string;
    rollbackFilename: string;
    installRowsAffected: number[] | null;
    rollbackRowsAffected: number[] | null;
    status: string;
};

/**
 * 
 */
export type SqlStatus = {
    message: string;
    code: string;
    errorno: number;
    sqlMessage: string;
    sqlState: string;
    sql: string;
}
