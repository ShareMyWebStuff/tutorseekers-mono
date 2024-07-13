import { DbConnection } from "../utils/db-utils";
import { RowDataPacket } from "mysql2";

export interface UserRecord extends RowDataPacket {
  deploy_id: number;
  description: string;
  filename: string;
  status: string;
  created_at: Date;

  user_id: number;
  email: string;
  password: string;
  google_id: string;
  google_email: string;
  tutor_acc: boolean;
  student_acc: boolean;
  parent_acc: boolean;
  admin_acc: boolean;

  google_acc: boolean;
  validated: boolean;
  validated_email: boolean;
  validated_mobile: boolean;

  verified: boolean;
  id_verified: boolean;
  photo_verified: boolean;
  id_photo_verified: boolean;
  addr_verified: boolean;
  dbs_verified: boolean;
  refs_verified: boolean;

  create_date: string;
}

const db = new DbConnection();
// db.connectToDB();

export const getAccountByGoogleId = async (googleId: string) => {
  const res = await db.query<UserRecord[]>(
    `SELECT * FROM user_login where google_id = ${googleId}`,
  );

  console.log(res);

  // if ( res.statusCode !== 200) {
  //   return res
  // }

  // const userDets = {
  //   rows : res.resultSet[0].length,
  //   user  : []
  // };

  // res.resultSet[0].forEach( ({user_id, email, tutor_acc, student_acc, parent_acc, admin_acc, password, google_acc, google_id, validated, validated_email, validated_mobile}) => {
  //     userDets.user.push ({userId: user_id, email, tutorAcc: (tutor_acc === 1), studentAcc: (student_acc === 1), parentAcc: (parent_acc === 1), adminAcc: (admin_acc === 1), password, googleAcc: (google_acc === 1), googleId: google_id, validated: (validated === 1), validatedEmail: (validated_email === 1), validatedMobile: (validated_mobile === 1) });
  // });

  return res;
};

export const getAccountByEmail = async (email: string) => {
  console.log("Calling - getAccountByEmail");
  try {
    const res = await db.query<UserRecord[]>(
      `SELECT * FROM user_login where email = '${email}';`,
    );

    console.log("data +++++++++++++++++++++++++++++++");
    console.log(res);

    return res;
  } catch (error: any) {
    // THIS ALL WORKS
    console.log("error +++++++++++++++++++++++++++++++");
    console.log(error);
    console.log("error.code");
    console.log(error.code);
    console.log("error.errorNo");
    console.log(error.errorNo);
    console.log("error.sqlMessage");
    console.log(error.sqlMessage);
    console.log("error.sqlState");
    console.log(error.sqlState);
    console.log("error.sql");
    console.log(error.sql);

    return "On no";
  }

  // if ( res.statusCode !== 200) {
  //   return res
  // }

  // const userDets = {
  //   rows : res.resultSet[0].length,
  //   user  : []
  // };

  // res.resultSet[0].forEach( ({user_id, email, tutor_acc, student_acc, parent_acc, admin_acc, password, google_acc, google_id, validated, validated_email, validated_mobile}) => {
  //     userDets.user.push ({userId: user_id, email, tutorAcc: (tutor_acc === 1), studentAcc: (student_acc === 1), parentAcc: (parent_acc === 1), adminAcc: (admin_acc === 1), password, googleAcc: (google_acc === 1), googleId: google_id, validated: (validated === 1), validatedEmail: (validated_email === 1), validatedMobile: (validated_mobile === 1) });
  // });
};

// Array of Arrays
// 2024-07-13T11:06:14.759Z	73f34aaf-18c2-4bbf-979d-4c1ff70822b9	INFO	Query Res ===> [
//   [
//     {
//       user_id: 1,
//       email: 'dave@harmonydata.co.uk',
//       password: 'Sausages01!',
//       google_id: '123456',
//       google_email: 'dave@harmonydata.co.uk',
//       tutor_acc: 1,
//       student_acc: 0,
//       parent_acc: 0,
//       admin_acc: 0,
//       google_acc: 0,
//       validated: 0,
//       validated_email: 0,
//       validated_mobile: 0,
//       verified: 0,
//       id_verified: 0,
//       photo_verified: 0,
//       id_photo_verified: 0,
//       addr_verified: 0,
//       dbs_verified: 0,
//       refs_verified: 0,
//       create_date: 2024-07-13T11:06:14.000Z
//     }
//   ],
//   [
//     `user_id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
//     `email` VARCHAR(254) NOT NULL,
//     `password` STRING(240),
//     `google_id` VARCHAR(25),
//     `google_email` VARCHAR(254) NOT NULL,
//     `tutor_acc` TINYINT(1) NOT NULL,
//     `student_acc` TINYINT(1) NOT NULL,
//     `parent_acc` TINYINT(1) NOT NULL,
//     `admin_acc` TINYINT(1) NOT NULL,
//     `google_acc` TINYINT(1) NOT NULL,
//     `validated` TINYINT(1) NOT NULL,
//     `validated_email` TINYINT(1) NOT NULL,
//     `validated_mobile` TINYINT(1) NOT NULL,
//     `verified` TINYINT(1) NOT NULL,
//     `id_verified` TINYINT(1) NOT NULL,
//     `photo_verified` TINYINT(1) NOT NULL,
//     `id_photo_verified` TINYINT(1) NOT NULL,
//     `addr_verified` TINYINT(1) NOT NULL,
//     `dbs_verified` TINYINT(1) NOT NULL,
//     `refs_verified` TINYINT(1) NOT NULL,
//     `create_date` TIMESTAMP(19)
//   ]
// ]
export const getAllAccounts = async () => {
  console.log("Calling - getAllAccounts");
  const res = await db.query<UserRecord[]>(`SELECT * FROM user_login;`);

  console.log(res);

  // if ( res.statusCode !== 200) {
  //   return res
  // }

  // const userDets = {
  //   rows : res.resultSet[0].length,
  //   user  : []
  // };

  // res.resultSet[0].forEach( ({user_id, email, tutor_acc, student_acc, parent_acc, admin_acc, password, google_acc, google_id, validated, validated_email, validated_mobile}) => {
  //     userDets.user.push ({userId: user_id, email, tutorAcc: (tutor_acc === 1), studentAcc: (student_acc === 1), parentAcc: (parent_acc === 1), adminAcc: (admin_acc === 1), password, googleAcc: (google_acc === 1), googleId: google_id, validated: (validated === 1), validatedEmail: (validated_email === 1), validatedMobile: (validated_mobile === 1) });
  // });

  return res;
};

// 2024-07-13T11:06:14.726Z	73f34aaf-18c2-4bbf-979d-4c1ff70822b9	INFO	ResultSetHeader {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 1,
//   info: '',
//   serverStatus: 2,
//   warningStatus: 0,
//   changedRows: 0
// }
export const createAccount = async (email: string) => {
  console.log("Calling - createAccount");
  const res = await db.execute(
    `INSERT INTO user_login ( email, password, google_id, google_email, tutor_acc, student_acc, parent_acc, google_acc ) VALUES ( '${email}', 'Sausages01!', '123456', 'dave@harmonydata.co.uk', true, false, false, true)`,
  );
  console.log(res);

  // if ( res.statusCode !== 200) {
  //   return res
  // }

  // const userDets = {
  //   rows : res.resultSet[0].length,
  //   user  : []
  // };

  // res.resultSet[0].forEach( ({user_id, email, tutor_acc, student_acc, parent_acc, admin_acc, password, google_acc, google_id, validated, validated_email, validated_mobile}) => {
  //     userDets.user.push ({userId: user_id, email, tutorAcc: (tutor_acc === 1), studentAcc: (student_acc === 1), parentAcc: (parent_acc === 1), adminAcc: (admin_acc === 1), password, googleAcc: (google_acc === 1), googleId: google_id, validated: (validated === 1), validatedEmail: (validated_email === 1), validatedMobile: (validated_mobile === 1) });
  // });

  return res;
};

// 2024-07-13T11:06:14.746Z	73f34aaf-18c2-4bbf-979d-4c1ff70822b9	INFO	ResultSetHeader {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 0,
//   info: 'Rows matched: 1  Changed: 1  Warnings: 0',
//   serverStatus: 2,
//   warningStatus: 0,
//   changedRows: 1
// }

// OR

// 2024-07-13T11:06:14.798Z	73f34aaf-18c2-4bbf-979d-4c1ff70822b9	INFO	ResultSetHeader {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 0,
//   info: 'Rows matched: 1  Changed: 0  Warnings: 0',
//   serverStatus: 2,
//   warningStatus: 0,
//   changedRows: 0
// }
export const updateAccount = async (userId: number, googleAcc: boolean) => {
  console.log("Calling - updateAccount");
  const res = await db.execute(
    `UPDATE user_login SET google_acc = ${googleAcc} WHERE user_id = ${userId}`,
  );
  console.log(res);

  // if ( res.statusCode !== 200) {
  //   return res
  // }

  // const userDets = {
  //   rows : res.resultSet[0].length,
  //   user  : []
  // };

  // res.resultSet[0].forEach( ({user_id, email, tutor_acc, student_acc, parent_acc, admin_acc, password, google_acc, google_id, validated, validated_email, validated_mobile}) => {
  //     userDets.user.push ({userId: user_id, email, tutorAcc: (tutor_acc === 1), studentAcc: (student_acc === 1), parentAcc: (parent_acc === 1), adminAcc: (admin_acc === 1), password, googleAcc: (google_acc === 1), googleId: google_id, validated: (validated === 1), validatedEmail: (validated_email === 1), validatedMobile: (validated_mobile === 1) });
  // });

  return res;
};

export const deleteAllAccounts = async () => {
  console.log("Calling - deleteAllAccounts");
  const res = await db.execute(`DELETE FROM user_login;`);
  console.log(res);

  // if ( res.statusCode !== 200) {
  //   return res
  // }

  // const userDets = {
  //   rows : res.resultSet[0].length,
  //   user  : []
  // };

  // res.resultSet[0].forEach( ({user_id, email, tutor_acc, student_acc, parent_acc, admin_acc, password, google_acc, google_id, validated, validated_email, validated_mobile}) => {
  //     userDets.user.push ({userId: user_id, email, tutorAcc: (tutor_acc === 1), studentAcc: (student_acc === 1), parentAcc: (parent_acc === 1), adminAcc: (admin_acc === 1), password, googleAcc: (google_acc === 1), googleId: google_id, validated: (validated === 1), validatedEmail: (validated_email === 1), validatedMobile: (validated_mobile === 1) });
  // });

  return res;
};

// 2024-07-13T11:06:15.049Z	73f34aaf-18c2-4bbf-979d-4c1ff70822b9	INFO	ResultSetHeader {
//   fieldCount: 0,
//   affectedRows: 0,
//   insertId: 0,
//   info: '',
//   serverStatus: 2,
//   warningStatus: 0,
//   changedRows: 0
// }
export const truncateTable = async () => {
  console.log("Calling - truncateTable");
  const res = await db.execute(`TRUNCATE TABLE user_login;`);
  console.log(res);

  // if ( res.statusCode !== 200) {
  //   return res
  // }

  // const userDets = {
  //   rows : res.resultSet[0].length,
  //   user  : []
  // };

  // res.resultSet[0].forEach( ({user_id, email, tutor_acc, student_acc, parent_acc, admin_acc, password, google_acc, google_id, validated, validated_email, validated_mobile}) => {
  //     userDets.user.push ({userId: user_id, email, tutorAcc: (tutor_acc === 1), studentAcc: (student_acc === 1), parentAcc: (parent_acc === 1), adminAcc: (admin_acc === 1), password, googleAcc: (google_acc === 1), googleId: google_id, validated: (validated === 1), validatedEmail: (validated_email === 1), validatedMobile: (validated_mobile === 1) });
  // });

  return res;
};
