//
// ErrorHandler
//
// A method can throw this error handler. All the details explaining what the issue is can be located here
//
// Parameters
//
// statusCode
// msg
// errorCode    Error code uniquely identifiers from where the error was thrown. This is of the format, although UniqueCode can be omitted.
//              <Module>__<Method>__<UniqueCode>  => 'MediaUploadModel__createMediaVerifyId__1'
// errorMsgs    An object that contains all the reasons an error has been thrown
//              userId    - The users id is not a valid number
//              postcode  - Your postcode is mandatory, please enter.
//
// Handles errors generated thoughout the application
export class ErrorHandler extends Error {
  constructor(
    public statusCode: number,
    public msg: string,
    public errorCode: string,
    public errorMsgs?: { [key: string]: string },
  ) {
    super(msg);
  }
}

export class ErrorHandlerObject extends Error {
  constructor(
    public statusCode: number,
    public msg: string,
    public errorCode: string,
    public errorMsgs: object,
  ) {
    super(msg);
  }
}

export class SqlError extends Error {
  constructor(
    public message: string,
    public code: string,
    public errorNo: number,
    public sqlMessage: string,
    public sqlState: string,
    public sql: string,
  ) {
    super(sqlMessage);
  }
}

export class ApiResponseError extends Error {
  constructor(
    public statusCode: string,
    public message: string,
    public body: string,
  ) {
    super(message);
  }
}

// export class SqlError extends Error{
//     constructor (public message: string, public code: string, public errorNo: number, public sqlMessage: string, public sqlState: string, public sql: string ){
//         super( sqlMessage )
//     }
// }
