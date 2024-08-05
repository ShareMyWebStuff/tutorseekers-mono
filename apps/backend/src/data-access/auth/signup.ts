import { DbConnection } from "../../foundation/db/db-utils";
import { ApiResponseError, SqlError } from "../../support/errors/errorHandler";
import { RegisterCompleteSchema } from "../../schemas/auth/registration-schema";
import { ResultSetHeader, RowDataPacket, ProcedureCallPacket } from "mysql2";

export interface UserLogin {
  userId: number;
  email: string | null;
  password: string | null;
  googleId: string | null;
  googleEmail: string | null;
  tutorAcc: boolean;
  studentAcc: boolean;
  parentAcc: boolean;
  adminAcc: boolean;
  googleAcc: boolean;
  validated: boolean;
  validatedEmail: boolean;
  validatedMobile: boolean;
  verified: boolean;
  idVerified: boolean;
  photoVerified: boolean;
  idPhotoVerified: boolean;
  addrVerified: boolean;
  dbsVerified: boolean;
  refsVerified: boolean;
  createDate: Date;
}

export interface UserRecordDB extends RowDataPacket {
  user_id: number;
  email: string;
  password: string;
  google_id: string;
  google_email: string;
  tutor_acc: number;
  student_acc: number;
  parent_acc: number;
  admin_acc: number;

  google_acc: number;
  validated: number;
  validated_email: number;
  validated_mobile: number;

  verified: number;
  id_verified: number;
  photo_verified: number;
  id_photo_verified: number;
  addr_verified: number;
  dbs_verified: number;
  refs_verified: number;

  create_date: string;
}

export interface UserDetailsRecordDB extends RowDataPacket {
  user_id: number;
  title: number;
  prefered_name: string;
  firstname: string | null;
  lastname: string | null;
  gender: number | null;
  address1: string | null;
  address2: string | null;
  town: string;
  county: string | null;
  postcode: string;
  country_id: number;
  phone: string | null;
  mobile: string | null;
  profile_title: string | null;
  photo_media_id: number | null;
  video_media_id: number | null;

  search_location_id: number | null;

  avg_rating: number | null;
  no_ratings: number | null;

  tutors_home: number;
  tutor_travels: number;
  tutor_online: number;

  teacher: number;
  in_education: number;

  has_degree: number;
  dbs: number;
  dbs_verified: number;

  avg_response: number | null;

  last_online: string;
  create_date: string;

  profile_title_verified: boolean;
  verified_by: number | null;
}

export interface GetUserLogins {
  rows: number;
  userAccs: UserLogin[];
}

const db = new DbConnection();
// db.connectToDB();

export const getAccountByGoogleId = async (googleId: string) => {
  try {
    const res = await db.query<UserRecordDB[]>(
      `SELECT * FROM user_login where google_id = ${googleId}`,
    );

    const users: GetUserLogins = {
      rows: res.length,
      userAccs: [],
    };

    res.forEach(
      ({
        user_id,
        email,
        password,
        google_id,
        google_email,
        tutor_acc,
        student_acc,
        parent_acc,
        admin_acc,
        google_acc,
        validated,
        validated_email,
        validated_mobile,
        verified,
        id_verified,
        photo_verified,
        id_photo_verified,
        addr_verified,
        dbs_verified,
        refs_verified,
        create_date,
      }) => {
        users.userAccs.push({
          userId: user_id,
          email,
          password,
          googleId: google_id,
          googleEmail: google_email,
          tutorAcc: tutor_acc === 1,
          studentAcc: student_acc === 1,
          parentAcc: parent_acc === 1,
          adminAcc: admin_acc === 1,
          googleAcc: google_acc === 1,
          validated: validated === 1,
          validatedEmail: validated_email === 1,
          validatedMobile: validated_mobile === 1,
          verified: verified === 1,
          idVerified: id_verified === 1,
          photoVerified: photo_verified === 1,
          idPhotoVerified: id_photo_verified === 1,
          addrVerified: addr_verified === 1,
          dbsVerified: dbs_verified === 1,
          refsVerified: refs_verified === 1,
          createDate: new Date(create_date),
        });
      },
    );

    return users;
  } catch (e) {
    if (e instanceof SqlError) {
      console.log(e);
    }

    throw new ApiResponseError(
      "500",
      "Database issue",
      JSON.stringify({
        message: "Internal server error - database",
        errorMsgs: {
          message: "Error searching for google account. Please try again.",
        },
      }),
    );
  }
};

export const getAccountByEmail = async (email: string) => {
  try {
    const res = await db.query<UserRecordDB[]>(
      `SELECT * FROM user_login where email = '${email}';`,
    );

    const users: GetUserLogins = {
      rows: res.length,
      userAccs: [],
    };

    res.forEach(
      ({
        user_id,
        email,
        password,
        google_id,
        google_email,
        tutor_acc,
        student_acc,
        parent_acc,
        admin_acc,
        google_acc,
        validated,
        validated_email,
        validated_mobile,
        verified,
        id_verified,
        photo_verified,
        id_photo_verified,
        addr_verified,
        dbs_verified,
        refs_verified,
        create_date,
      }) => {
        users.userAccs.push({
          userId: user_id,
          email,
          password,
          googleId: google_id,
          googleEmail: google_email,
          tutorAcc: tutor_acc === 1,
          studentAcc: student_acc === 1,
          parentAcc: parent_acc === 1,
          adminAcc: admin_acc === 1,
          googleAcc: google_acc === 1,
          validated: validated === 1,
          validatedEmail: validated_email === 1,
          validatedMobile: validated_mobile === 1,
          verified: verified === 1,
          idVerified: id_verified === 1,
          photoVerified: photo_verified === 1,
          idPhotoVerified: id_photo_verified === 1,
          addrVerified: addr_verified === 1,
          dbsVerified: dbs_verified === 1,
          refsVerified: refs_verified === 1,
          createDate: new Date(create_date),
        });
      },
    );

    return users;
  } catch (e) {
    if (e instanceof SqlError) {
      console.log(e);
    }

    throw new ApiResponseError(
      "500",
      "Database issue",
      JSON.stringify({
        message: "Internal server error - database",
        errorMsgs: {
          message: "Error searching for email account. Please try again.",
        },
      }),
    );
  }
};

export const getAllAccounts = async () => {
  try {
    const res = await db.query<UserRecordDB[]>(`SELECT * FROM user_login;`);

    const users: GetUserLogins = {
      rows: res.length,
      userAccs: [],
    };

    res.forEach(
      ({
        user_id,
        email,
        password,
        google_id,
        google_email,
        tutor_acc,
        student_acc,
        parent_acc,
        admin_acc,
        google_acc,
        validated,
        validated_email,
        validated_mobile,
        verified,
        id_verified,
        photo_verified,
        id_photo_verified,
        addr_verified,
        dbs_verified,
        refs_verified,
        create_date,
      }) => {
        users.userAccs.push({
          userId: user_id,
          email,
          password,
          googleId: google_id,
          googleEmail: google_email,
          tutorAcc: tutor_acc === 1,
          studentAcc: student_acc === 1,
          parentAcc: parent_acc === 1,
          adminAcc: admin_acc === 1,
          googleAcc: google_acc === 1,
          validated: validated === 1,
          validatedEmail: validated_email === 1,
          validatedMobile: validated_mobile === 1,
          verified: verified === 1,
          idVerified: id_verified === 1,
          photoVerified: photo_verified === 1,
          idPhotoVerified: id_photo_verified === 1,
          addrVerified: addr_verified === 1,
          dbsVerified: dbs_verified === 1,
          refsVerified: refs_verified === 1,
          createDate: new Date(create_date),
        });
      },
    );

    return users;
  } catch (e) {
    if (e instanceof SqlError) {
      console.log(e);
    }

    throw new ApiResponseError(
      "500",
      "Database issue",
      JSON.stringify({
        message: "Internal server error - database",
        errorMsgs: {
          message: "Error retrieving all accounts. Please try again.",
        },
      }),
    );
  }
};

export const createAccount = async (
  googleAcc: boolean,
  email: string | null,
  password: string | null,
  googleId: string | null,
  googleEmail: string | null,
) => {
  try {
    console.log("Create Account");
    console.log(
      `INSERT INTO user_login ( email, password, google_id, google_email, tutor_acc, student_acc, parent_acc, google_acc ) VALUES ( ${email}, '${password}', ${googleId}, ${googleEmail}, false, false, false, ${googleAcc})`,
    );
    const res = await db.execute<ResultSetHeader>(
      `INSERT INTO user_login ( email, password, google_id, google_email, tutor_acc, student_acc, parent_acc, google_acc ) VALUES ( ${email}, '${password}', ${googleId}, ${googleEmail}, false, false, false, ${googleAcc})`,
    );

    const { affectedRows, insertId } = res;
    return {
      affectedRows,
      insertId,
    };
  } catch (e) {
    console.log("ERROR");
    console.log(e);
    if (e instanceof SqlError) {
      console.log(e);
    }

    throw new ApiResponseError(
      "500",
      "Database issue",
      JSON.stringify({
        message: "Internal server error - database",
        errorMsgs: {
          message: "Error creating account. Please try again.",
        },
      }),
    );
  }
};

export const updateAccount = async (
  userId: number,
  googleAcc: boolean,
  email: string | null,
  password: string | null,
  googleId: string | null,
  googleEmail: string | null,
) => {
  try {
    const res = await db.execute<ResultSetHeader>(
      `UPDATE user_login SET google_acc = ${googleAcc}, email = ${email}, password = ${password}, google_id = ${googleId}, google_email=${googleEmail} WHERE user_id = ${userId}`,
    );
    const { affectedRows } = res;

    return { affectedRows };
  } catch (e) {
    if (e instanceof SqlError) {
      console.log("SqlError");
      console.log(e);
    }
    console.log("Outside SqlError");
    console.log(e);

    throw new ApiResponseError(
      "500",
      "Database issue",
      JSON.stringify({
        message: "Internal server error - database",
        errorMsgs: {
          message: "Error updating account. Please try again.",
        },
      }),
    );
  }
};
/**
 *
 * @param userId
 * @param data
 * @returns
 */
export const setRegisterComplete = async (
  userId: number,
  verifyToken: string | null,
  data: RegisterCompleteSchema,
) => {
  // try {
  console.log("Hello, please write this code.");
  //   const res = await db.execute<ResultSetHeader>(
  //     `UPDATE user_login SET google_acc = ${googleAcc}, email = ${email}, password = ${password}, google_id = ${googleId}, google_email=${googleEmail} WHERE user_id = ${userId}`,
  //   );
  //   const { affectedRows } = res;

  //   return { affectedRows };
  // } catch (e) {
  //   if (e instanceof SqlError) {
  //     console.log("SqlError");
  //     console.log(e);
  //   }
  //   console.log("Outside SqlError");
  //   console.log(e);

  //   throw new ApiResponseError(
  //     "500",
  //     "Database issue",
  //     JSON.stringify({
  //       message: "Internal server error - database",
  //       errorMsgs: {
  //         message: "Error updating account. Please try again.",
  //       },
  //     }),
  //   );
  // }
  // // Check if user details have already been
  // try {
  //   // 🎯 TODO: Select user_details row
  //   const userDetsRS = await db.query<UserDetailsRecordDB[]>(
  //     `SELECT * FROM user_details WHERE user_id = ${userId};`,
  //   );

  //   const insertDets = userDetsRS.length === 0;

  //   // 🎯 TODO: Update the user_login - should error if no row exists

  //   if (userDetsRC === 1) {
  //     // 🎯 TODO: Update the user details
  //   } else {
  //     // 🎯 TODO: Insert the user details
  //   }

  //   // 🎯 TODO: If email verified false

  //   // Delete
  //   const res = await db.execute<ResultSetHeader>(
  //     `UPDATE user_login SET google_acc = ${googleAcc}, email = ${email}, password = ${password}, google_id = ${googleId}, google_email=${googleEmail} WHERE user_id = ${userId}`,
  //   );
  //   const { affectedRows } = res;

  //   return { affectedRows };
  // } catch (e) {
  //   if (e instanceof SqlError) {
  //     console.log("SqlError");
  //     console.log(e);
  //   }
  //   console.log("Outside SqlError");
  //   console.log(e);

  //   throw new ApiResponseError(
  //     "500",
  //     "Database issue",
  //     JSON.stringify({
  //       message: "Internal server error - database",
  //       errorMsgs: {
  //         message: "Error updating account. Please try again.",
  //       },
  //     }),
  //   );
  // }
};

export const deleteAllAccounts = async () => {
  try {
    const res = await db.execute<ResultSetHeader>(`DELETE FROM user_login;`);

    const { affectedRows } = res;

    return { affectedRows };
  } catch (e) {
    if (e instanceof SqlError) {
      console.log(e);
    }

    throw new ApiResponseError(
      "500",
      "Database issue",
      JSON.stringify({
        message: "Internal server error - database",
        errorMsgs: {
          message: "Error deleting account. Please try again.",
        },
      }),
    );
  }
};

export const truncateTable = async () => {
  try {
    const res = await db.execute(`TRUNCATE TABLE util_database_deploy;`);

    return true;
  } catch (e) {
    if (e instanceof SqlError) {
      console.log(e);
    }

    throw new ApiResponseError(
      "500",
      "Database issue",
      JSON.stringify({
        message: "Internal server error - database",
        errorMsgs: {
          message: "Error truncating table. Please try again.",
        },
      }),
    );
  }
};

export const selectDatabaseDeploy = async () => {
  try {
    // let res = await db.execute(`DROP TABLE user_login;`);
    // console.log(res);
    // res = await db.execute(
    //   `UPDATE util_database_deploy SET status = 'U' WHERE deploy_id = 71;`,
    // );
    // console.log(res);
    // res = await db.query(`SELECT * FROM util_database_deploy;`);s

    let res = await db.query(
      `SELECT * FROM util_database_deploy WHERE deploy_id > 300;`,
    );
    console.log("res");

    let idx = await db.query(
      `SELECT DISTINCT TABLE_NAME, INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS;`,
    );
    console.log("idx");
    console.log(idx);

    return true;
  } catch (e) {
    console.log(e);
  }
};
