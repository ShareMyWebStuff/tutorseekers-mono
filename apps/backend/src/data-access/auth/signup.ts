import { DbConnection } from "../../foundation/db/db-utils";
import { ApiResponseError, SqlError } from "../../support/errors/errorHandler";
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
  googleId: string | null,
  googleEmail: string | null,
) => {
  try {
    const res = await db.execute<ResultSetHeader>(
      `INSERT INTO user_login ( email, password, google_id, google_email, tutor_acc, student_acc, parent_acc, google_acc ) VALUES ( ${email}, '', ${googleId}, ${googleEmail}, false, false, false, ${googleAcc})`,
    );

    const { affectedRows, insertId } = res;
    return {
      affectedRows,
      insertId,
    };
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
  googleId: string | null,
  googleEmail: string | null,
) => {
  try {
    const res = await db.execute<ResultSetHeader>(
      `UPDATE user_login SET google_acc = ${googleAcc}, email = ${email}, googleId = ${googleId}, googleEmail=${googleEmail} WHERE user_id = ${userId}`,
    );
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
          message: "Error updating account. Please try again.",
        },
      }),
    );
  }
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
    const res = await db.execute(`TRUNCATE TABLE user_login;`);

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
