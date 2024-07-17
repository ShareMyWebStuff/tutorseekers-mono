import { DbConnection } from "../../foundation/db/db-utils";
import { ApiResponseError, SqlError } from "../../support/errors/errorHandler";
import { ResultSetHeader, RowDataPacket, ProcedureCallPacket } from "mysql2";

const db = new DbConnection();

//
// createUserRefreshToken
//
// Saves the refresh token
//
export const createUserRefreshToken = async (
  userId: number,
  refreshToken: string,
) => {
  try {
    await db.execute<ResultSetHeader>(
      `DELETE FROM user_refresh_tokens WHERE user_id = ${userId};`,
    );

    const res = await db.execute<ResultSetHeader>(
      `INSERT INTO user_refresh_tokens (user_id, refresh_token) VALUES (${userId}, '${refreshToken}');`,
    );

    const { affectedRows } = res;
    if (affectedRows !== 1) {
      throw new ApiResponseError(
        "500",
        "Database issue",
        JSON.stringify({
          message: "Internal server error - database",
          errorMsgs: {
            message: "Error saving refresh token. Please try again",
          },
        }),
      );
    }
    return { statusCode: 201, msg: "Refresh token created." };
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

//
// Function : deleteUserRefreshToken
//
// Deletes a users refresh token
//
export const deleteUserRefreshToken = async (userId: number) => {
  try {
    await db.execute<ResultSetHeader>(
      `DELETE FROM user_refresh_tokens WHERE user_id = ${userId};`,
    );

    return { statusCode: 201, msg: "Refresh token deleted." };
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

export interface UserRefreshToken {
  userId: number;
  refreshToken: string;
  createDate: Date;
}
interface UserRefreshTokenDB extends RowDataPacket {
  user_id: number;
  refresh_token: string;
  create_date: string;
}

export interface GetUserRefreshToken {
  rows: number;
  userRefreshToken: UserRefreshToken[];
}

//
// Function : retrieveUserRefreshTokenById
//
// Retrieves a users refresh token by the users id
//
export async function retrieveUserRefreshTokenById(userId: number) {
  try {
    const res = await db.query<UserRefreshTokenDB[]>(
      `SELECT * FROM user_refresh_tokens WHERE user_id = ${userId};`,
    );

    const users: GetUserRefreshToken = {
      rows: res.length,
      userRefreshToken: [],
    };

    res.forEach(({ user_id, refresh_token, create_date }) => {
      users.userRefreshToken.push({
        userId: user_id,
        refreshToken: refresh_token,
        createDate: new Date(create_date),
      });
    });

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
          message: "Error retrieving refresh token. Please try again.",
        },
      }),
    );
  }
}
