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
db.connectToDB();

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
  const res = await db.query<UserRecord[]>(
    `SELECT * FROM user_login where email = ${email}`,
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
