import * as S3 from "@aws-sdk/client-s3";
import { FileStructure } from "./types";
import { listFilesOnS3Bucket } from "./aws-utils";

const client = new S3.S3Client({});

export class DatabaseDeployFile {
  private bucketName: string;
  private fileName: string;
  private modeSet: boolean = false;
  private mode: string = "";
  private fileErrors: number = 0;
  private filesInBucket: string[] = [];
  private deployRecs: FileStructure[] = [];

  constructor(bucketName: string, fileName: string) {
    this.bucketName = bucketName;
    this.fileName = fileName;
  }

  public streamToString(stream) {
    new Promise((resolve, reject) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
  }

  public async readFile() {
    const params = {
      Bucket: this.bucketName,
      Key: this.fileName,
    };

    const command = new S3.GetObjectCommand(params);
    const response = await client.send(command);

    const { Body } = response;

    return this.streamToString(Body);
  }

  public async checkFile() {
    console.log("1- checkFile");

    // Read all files from S3 bucket
    console.log("2- checkFile");
    this.filesInBucket = await listFilesOnS3Bucket({ Bucket: this.bucketName });
    console.log("Files in bucket ...");
    console.log(this.filesInBucket);

    // Read file in from database deploy file
    console.log("3- checkFile");
    const poo = await this.readFile();
    console.log("4- checkFile");
    console.log(poo);
    console.log("5- checkFile");
    // this.deployRecs = await this.readDatabaseDeployFile<FileStructure>();
    console.log("Files in deploy file ...");
    console.log(this.deployRecs);

    console.log("4- checkFile");
    await this.checkAllsFileExists();

    console.log("5- checkFile");
    if (this.deployRecs.length === 0) {
      console.log(
        `No records found in file ${this.fileName} on bucket ${this.bucketName}`,
      );
      throw new Error(
        `No records found in file ${this.fileName} on bucket ${this.bucketName}`,
      );
    }
  }

  /**
   * Read the database deploy file from the S3 bucket and checks each deploy record is of the required format
   */
  //   private async readDatabaseDeployFile<T>() {
  //     try {
  //       console.log("1- readDatabaseDeployFile");
  //       const s3Params = { Bucket: this.bucketName, Key: this.fileName };
  //       console.log("s3Params");
  //       console.log(s3Params);
  //       console.log("2- readDatabaseDeployFile");
  //       const response = await s3.getObject(s3Params).promise();
  //       console.log("3- readDatabaseDeployFile");
  //       const fileContent = response.Body?.toString("utf-8");
  //       console.log("4- readDatabaseDeployFile");
  //       const tmpLines: string[] = !fileContent ? [] : fileContent?.split("\r\n");

  //       // Remove comments and blank lines
  //       const lines = tmpLines.filter(
  //         (line) => !line.startsWith("--") && line.trimEnd().length > 0,
  //       );
  //       console.log("5- readDatabaseDeployFile");

  //       this.modeSet = false;
  //       this.mode = "";
  //       this.fileErrors = 0;

  //       const dataDeploys = lines.map((line, idx) => {
  //         console.log("6- readDatabaseDeployFile");
  //         console.log(line);
  //         const deploy = line.split("|");
  //         if (deploy.length !== 9) {
  //           console.log(
  //             `Error reading line ${idx} from file ${this.fileName} from bucket ${this.bucketName}`,
  //           );
  //           this.fileErrors++;
  //         } else if (deploy[8].trimEnd() !== "") {
  //           if (this.mode !== "" && this.mode !== deploy[8].trimEnd()) {
  //             console.log(
  //               `Different modes in file found. Previous (${this.mode}) current (${deploy[8].trimEnd()})`,
  //             );
  //             this.fileErrors++;
  //           }
  //           this.mode = deploy[8].trimEnd();
  //           this.modeSet = true;
  //         }
  //         return {
  //           deployId: parseInt(deploy[0]),
  //           instDesc: deploy[1].trimEnd(),
  //           instFilename: deploy[2].trimEnd(),
  //           instRowCounts:
  //             deploy[3].trimEnd() === ""
  //               ? null
  //               : deploy[3]
  //                   .trimEnd()
  //                   .split(",")
  //                   .map((item) => parseInt(item)),
  //           rollbackDesc: deploy[4].trimEnd(),
  //           rollbackFilename: deploy[5].trimEnd(),
  //           rollbackRowCounts:
  //             deploy[6].trimEnd() === ""
  //               ? null
  //               : deploy[6]
  //                   .trimEnd()
  //                   .split(",")
  //                   .map((item) => parseInt(item)),
  //           dataFilename: deploy[7].trimEnd(),
  //           mode: deploy[8].trimEnd(),
  //         };
  //       });

  //       console.log("7- readDatabaseDeployFile");

  //       if (this.fileErrors > 0) {
  //         throw new Error(
  //           `Error in file ${this.fileName} on bucket ${this.bucketName}`,
  //         );
  //       }

  //       console.log("8- readDatabaseDeployFile");
  //       console.log(dataDeploys);
  //       return dataDeploys as T[];
  //     } catch (err) {
  //       console.log(
  //         `File may not exist on bucket. File ${this.fileName} from bucket ${this.bucketName}.`,
  //       );
  //       throw `Error reading file ${this.fileName} from bucket ${this.bucketName}. Does it exist.`;
  //     }
  //   }

  /**
   * Checks all the deploy records in the file exist on the S3 bucket
   *
   * @param filesRequired
   * @param s3Files
   * @returns
   */
  private async checkAllsFileExists() {
    // Check all files exist
    let filesExist = true;
    this.deployRecs.forEach((fileDetails) => {
      // Need either the install or uninstall file to exist or both
      if (
        fileDetails.instFilename === "" &&
        fileDetails.rollbackFilename === ""
      ) {
        console.log(
          `${fileDetails.deployId} - Have no install or uninstall file.`,
        );
        filesExist = false;
      }

      // Check the install file exists on the bucket
      if (
        fileDetails.instFilename !== "" &&
        !this.filesInBucket.includes(fileDetails.instFilename)
      ) {
        console.log(
          `${fileDetails.deployId} - ${fileDetails.instFilename} does not exist.}`,
        );
        filesExist = false;
      }

      // Check the uninstall file exists on the bucket
      if (
        fileDetails.rollbackFilename !== "" &&
        !this.filesInBucket.includes(fileDetails.rollbackFilename)
      ) {
        console.log(
          `${fileDetails.deployId} - ${fileDetails.rollbackFilename} does not exist.}`,
        );
        filesExist = false;
      }

      // If data filename is set then check it exists
      if (
        fileDetails.dataFilename !== "" &&
        !this.filesInBucket.includes(fileDetails.dataFilename)
      ) {
        console.log(
          `${fileDetails.deployId} - ${fileDetails.dataFilename} does not exist.}`,
        );
        filesExist = false;
      }
    });

    if (!filesExist) {
      throw new Error(`One or more files do not exist on the S3 bucket.`);
    }

    return filesExist;
  }

  // Holds the mode if one is set
  public getMode() {
    return this.mode;
  }

  // Set if a mode is entered in the deploy file
  public isModeSet() {
    return this.modeSet;
  }

  // Returns the number of file errors when parsing the deploy file
  public getFileErrors() {
    return this.fileErrors;
  }

  // Returns the number of file errors when parsing the deploy file
  public getLoadFiles() {
    return this.deployRecs;
  }
}
