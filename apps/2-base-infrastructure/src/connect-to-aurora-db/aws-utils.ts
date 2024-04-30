import {
    S3Client,
    // This command supersedes the ListObjectsCommand and is the recommended way to list objects.
    ListObjectsV2Command,
    GetObjectCommand,
  } from "@aws-sdk/client-s3";

  const client = new S3Client({});

export const listFilesOnS3Bucket = async (params: any) => {
    try {
        const command = new ListObjectsV2Command(params);
        const response = await client.send(command);

        const fileObjs = !response ||!response.Contents ? []: response.Contents;

        return fileObjs?.map((content) => content!.Key) as string[];
    } catch (err) {
        throw err;
    }
};

export const readFileIn = async (bucketName: string, fileName: string ) => {
    try {
        const s3Params = {Bucket: bucketName, Key: fileName};
        const command = new GetObjectCommand(s3Params);
        const response = await client.send(command);
        return await response.Body?.transformToString();

    } catch (error) {
        console.log (`Error reading from ${fileName}`)
        throw error;
    }
}

// import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3"

// type S3FileParams = {
//   Bucket: string;
//   Key: string;
// };

// export const checkS3FileExists = async (params: S3FileParams) => {
//     try {
//         const config = {}
//         const input = {
//             Bucket: 'your-bucket',
//             Key: 'test.txt'
//         }
//         const client = new S3Client(config)
//         const command = new HeadObjectCommand(input)
//         const response = await client.send(command)
//         console.log(response)
//         return true;            
//     } catch (err) {
//         // Handle other errors
//         console.log ('ERROR +++++++++++++++++++++')
//         console.log (err)
//         return false;
//     }
// };

// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();

// type S3FileParams = {
//   Bucket: string;
//   Key: string;
// };

// export const checkS3FileExists = async (params: S3FileParams) => {
//     try {
//         console.log ('Calling it ...')
//         await s3.headObject(params).promise();
//         console.log ('Calling it after ...')
//         return true;
//     } catch (err) {
//         console.log ('ERROR')
//         console.log (err)
//         if (err.code === 'NotFound') {
//         return false;
//         }
//         // Handle other errors
//         return false;
//     }
// };
