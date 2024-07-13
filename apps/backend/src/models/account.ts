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

export const selectError = async () => {
  console.log("Calling - selectError");
  const res = await db.execute(`SELECT * a FROM user_lo;`);
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
