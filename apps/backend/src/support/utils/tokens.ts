import { Secret, verify, sign } from "jsonwebtoken";
import { genSalt, hash, compare } from "bcryptjs";
//
// Function : createToken
//
// Common function to decipher the items in the token.
//
// ReturnValues :
//
export const createToken = (
  payload: object,
  secret: Secret,
  expire: string,
) => {
  try {
    const token = sign(payload, secret, { expiresIn: expire });
    return token;
  } catch (err) {
    throw { statusCode: 500, msg: "Cannot create JWT token." };
  }
};

//
// Function : comparePasswords
//
// Common function to hash a password so it cant be seen
//
// ReturnValues :
//
export const comparePasswords = async (
  password: string,
  encryptPassword: string,
) => {
  try {
    return await compare(password, encryptPassword);
  } catch (err) {
    throw err;
  }
};

// import { APIGatewayProxyEvent } from 'aws-lambda';
// import { Secret, verify, sign } from 'jsonwebtoken';
// import { genSalt, hash, compare } from 'bcryptjs';
// const db = require ('/opt/nodejs/db').mysqlDB();
// const model = require ('/opt/nodejs/user-auth-model').modelUserAuth();

// const tokens = () => {

//     //
//     // Function : verifyJWTToken
//     //
//     // Common function to decipher the items in the token.
//     //
//     // ReturnValues :
//     //
//     function verifyJWTToken (events: APIGatewayProxyEvent, secret: Secret) {

//         let decoded;

//         if ( !events.headers || (events.headers['x-auth-token'] === undefined && events.headers['X-Auth-Token'] === undefined ) ){
//             throw { statusCode: 401, errorMsg: "User is not signed in." };
//         }

//         const token = (events.headers['x-auth-token'] ? events.headers['x-auth-token'] : events.headers['X-Auth-Token'] );

//         if ( !token || token === '' ) {
//             throw { statusCode: 401, errorMsgs: {msg: "User is not signed in."} };
//         }

//         try {
//             decoded = verify(token, secret);

//         } catch (err) {
//             throw { statusCode: 401, errorMsgs: {msg: "User is not signed in." } };
//         }
//         return decoded;
//     }

//     //
//     // Function : newVerifyJWTToken
//     //
//     // Common function to decipher the items in the token.
//     //
//     // ReturnValues :
//     //
//     function newVerifyJWTToken (token: string, secret: Secret) {

//         let decoded;

//         // if ( !events.headers || (events.headers['x-auth-token'] === undefined && events.headers['X-Auth-Token'] === undefined ) ){
//         //     throw { statusCode: 401, errorMsg: "User is not signed in." };
//         // }

//         // const token = (events.headers['x-auth-token'] ? events.headers['x-auth-token'] : events.headers['X-Auth-Token'] );

//         if ( !token || token === '' ) {
//             throw { statusCode: 401, errorMsgs: {msg: "User is not signed in."} };
//         }

//         try {
//             decoded = verify(token, secret);

//         } catch (err) {
//             throw { statusCode: 401, errorMsgs: {msg: "User is not signed in." } };
//         }
//         return decoded;
//     }

//     //
//     // Function : verifyToken
//     //
//     // Common function to decipher the items in the token.
//     //
//     // ReturnValues :
//     //
//     function verifyToken (token: string, secret: Secret) {

//         let decoded;

//         if ( !token || token === '' ) {
//             throw { statusCode: 401, errorMsgs: {msg: "User is not signed in." } };
//         }

//         try {
//             decoded = verify(token, secret);

//         } catch (err) {
//             throw { statusCode: 401, errorMsgs: { msg: "User is not signed in." } };
//         }
//         return decoded;
//     }

//     //
//     // Function : createToken
//     //
//     // Common function to decipher the items in the token.
//     //
//     // ReturnValues :
//     //
//     function createToken( payload: object, secret: Secret, expire: string ) {

//         try {
//             const token = sign(payload, secret, {expiresIn: expire});
//             return token;
//         } catch (err) {
//             throw { statusCode: 500, msg: 'Cannot create JWT token.' };
//         }
//     }

//     //
//     // Function : hashPassword
//     //
//     // Common function to hash a password so it cant be seen
//     //
//     // ReturnValues :
//     //
//     const hashPassword = async ( password: string ) => {
//         try {

//             const salt = await genSalt(10);
//             const hashedPwd = await hash (password, salt)
//             return hashedPwd;

//         } catch (err) {
//             throw err;
//         }
//     }

//     //
//     // Function : comparePasswords
//     //
//     // Common function to hash a password so it cant be seen
//     //
//     // ReturnValues :
//     //
//     const comparePasswords = async ( password: string, encryptPassword: string ) => {
//         try {

//             return await compare(password, encryptPassword);

//         } catch (err) {
//             throw err;
//         }
//     }

//     //
//     // Function : parseCookie
//     //
//     // Common function to hash a password so it cant be seen
//     //
//     // ReturnValues :
//     //
//     const parseCookie = ( str: string ) => {
//         if ( !str ) return {}

//         return str
//         .split(';')
//         .map(v => v.split('='))
//         .reduce((acc: any, v) => {
//             const n = decodeURIComponent(v[0].trim())
//             acc[n] = decodeURIComponent(v[1].trim());
//             return acc;
//         }, {});
//     }

//     //
//     // handleAuthCookies
//     //
//     // This function is passed the event object. We check the event to see if we have a valid access token. If the access token has expired we try to refresh the
//     // access and refresh token and send them back.
//     //
//     // If the tokens are missing and error message is returned
//     //
//     /*
//     -- Tokens okay
//     decoded {userId, accountType }

// - No Access Cookie
// statusCode : 401
// decoded: null

// -- Access Cookie Completely Messed Up
// statusCode : 401
// decoded: null

// -- Access cookie good
// statusCode: 200
// decoded : userId, accountType, access (T - temp, F - full)

// -- No Refresh cookie
// statusCode : 401
// decoded: null

// -- Refresh cookie Completely messed Up
// statusCode : 401
// decoded: null

// -- Refresh Cookie does not exist on the database
// statusCode : 401
// decoded: null

// -- Issue Creating New Refresh Cookie
// statusCode : 401
// decoded: null

//     statusCode
//         200     Access token decoded successfully and returned                      Set decoded
//         201     Created a new access / refresh token and returned decoded item      Set decoded, newAccessToken, newRefreshToken
//         401     The user could not be authenticated                                 Set msg
//     */
//     interface I_CookieReturn {
//         newAccessToken: null | string
//         newRefreshToken: null | string
//         oldRefreshToken: null | string
//         decoded: null | {userId: number, accountType: number, access: string}
//         statusCode: number
//         msg: null | string
//         subMsg: null | string
//         signedIn: boolean
//         fullAccess: boolean
//         refreshedCookie: boolean
//     }

//     const handleAuthCookies = async ( event: APIGatewayProxyEvent, accessSecret: string, refreshSecret: string ) => {
//         let res: I_CookieReturn = {
//             newAccessToken: null,
//             newRefreshToken: null,
//             oldRefreshToken: null,
//             decoded: null,
//             statusCode: 200,
//             msg: null,
//             subMsg: null,
//             signedIn: false,
//             fullAccess: false,
//             refreshedCookie: false
//         }
//         console.log ('** HandleAuthCookies')

//         // Check cookie exists on the event object
//         if (!event || !event.headers || (!event.headers.cookie && !event.headers.Cookie) ) {
//             console.log ('** handleAuthCookies - No cookies were sent to backend.')
//             res.statusCode = 401
//             res.msg = 'Please sign in.'
//             res.subMsg = 'Cookies do not exist'
//             return res;
//         }

//         const cookies = ( event.headers.cookie === undefined ? parseCookie(event.headers.Cookie!) : parseCookie(event.headers.cookie) )
//         if (!cookies || !cookies['refreshToken'] || !cookies['accessToken'] || cookies['refreshToken'] === 'undefined' || cookies['accessToken'] === 'undefined') {
//             console.log ('** handleAuthCookies - Cookies are missing from the request to the backend.')
//             console.log (!cookies)
//             console.log (cookies['refreshToken'])
//             console.log (cookies['accessToken'])

//             res.statusCode = 401
//             res.msg = 'Please sign in.'
//             res.subMsg = 'Refresh or access tokens are missing.'
//             return res;
//         }

//         // Check the access and refresh token exists in the cookie object
//         try {

//             const decoded = newVerifyJWTToken (cookies['accessToken'], accessSecret);
//             if ( typeof decoded === 'string') {
//                 console.log ('** handleAuthCookies - Issue decoding the access token.')
//                 console.log (cookies['accessToken'])
//                 console.log (accessSecret)

//                 res.statusCode = 401
//                 res.msg = 'Please sign in.'
//                 res.subMsg = 'Issue decoding access token (string).'
//                 return res;
//             } else {
//                 console.log ('** handleAuthCookies - Access token good.')
//                 res.oldRefreshToken = cookies['refreshToken']
//                 res.decoded = { userId: decoded.userId, accountType: decoded.accountType, access: decoded.access }
//                 res.signedIn = true
//                 res.fullAccess = ( decoded.accountType === 'F')
//                 return res;
//             }

//         } catch (err) {
//             console.log ('** handleAuthCookies - Error setting th access token. Lets see if refresh token is good.')
//             res.statusCode = 201;
//         }

//         // If statusCode === 201 then we need to reset the tokens
//         if ( res.statusCode === 201) {
//             try {

//                 const decoded = newVerifyJWTToken (cookies['refreshToken'], refreshSecret);
//                 if ( typeof decoded === 'string') {
//                     console.log ('** handleAuthCookies - Error decoding the refresh cookie.')

//                     res.statusCode = 401
//                     res.msg = 'Please sign in.'
//                     res.subMsg = 'Issue decoding refresh token (string).'
//                     return res;
//                 } else {
//                     // Create the access / refresh tokens
//                     console.log ('** handleAuthCookies - Creating new refresh and access tokens.')

//                     res.newAccessToken = createToken( { userId: decoded.userId, accountType: decoded.accountType, access: decoded.access }, accessSecret, '30m' );
//                     res.newRefreshToken = createToken( { userId: decoded.userId, accountType: decoded.accountType, access: decoded.access }, refreshSecret, '1y' );
//                     res.decoded = { userId: decoded.userId, accountType: decoded.accountType, access: decoded.access };
//                     res.fullAccess = ( decoded.accountType === 'F')
//                 }
//             } catch (err) {
//                 console.log ('** handleAuthCookies - Error decoding the refresh token.')

//                 res.statusCode = 401
//                 res.msg = 'Please sign in.'
//                 res.subMsg = 'Issue decoding refresh token.'
//                 return res;
//             }

//             // Check the refresh cookie exists
//             try {

//                 let userTokens = await model.retrieveUserRefreshTokenById ( res.decoded.userId );
//                 if (userTokens.rows !== 1) {
//                     console.log ('** handleAuthCookies - No rows found for the user on the refresh cookie table.')

//                     res.statusCode = 401
//                     res.msg = 'Please sign in.'
//                     res.subMsg = 'Existing refresh token does not exist on the database.'
//                     return res;
//                 }

//                 let foundToken = userTokens.refreshTokens.find ( (tk: {userId: number, refreshToken: string}) => tk.refreshToken === cookies['refreshToken'])
//                 if (foundToken === undefined ) {
//                     console.log ('** handleAuthCookies - The refresh cookie does not exist for this user.')
//                     console.log (JSON.stringify(userTokens))
//                     console.log (JSON.stringify(cookies))

//                     res.statusCode = 401
//                     res.msg = 'Please sign in.'
//                     res.subMsg = 'Refresh token does not exist for this user.'
//                     return res;
//                 }

//             } catch (err) {
//                 console.log ('** handleAuthCookies - ERROR retrieving refresh token from database.')

//                 res.statusCode = 401
//                 res.msg = 'Please sign in.'
//                 res.subMsg = 'Error retrieving refresh token from th database.'
//                 return res;
//             }

//             // Write the new refresh token to the database
//             try {

//                 let userTokens = await model.createUserRefreshToken ( res.decoded.userId, res.newRefreshToken );
//                 if (userTokens.statusCode !== 201) {
//                     console.log ('** handleAuthCookies - The new refresh cookie has been saved.')

//                     res.statusCode = 401
//                     res.msg = 'Please sign in.'
//                     res.subMsg = 'Error saving the refresh token.'
//                     return res;
//                 }

//             } catch (err) {
//                 console.log ('** handleAuthCookies - ERROR saving the new refresh cookie.')

//                 res.statusCode = 401
//                 res.msg = 'Please sign in.'
//                 res.subMsg = 'Fatal error saving the refresh token.'
//                 return res;
//             }
//         }
//         console.log ('** handleAuthCookies - At the end.')

//         res.oldRefreshToken = res.newRefreshToken
//         res.refreshedCookie = true
//         res.signedIn = true
//         return res;
//     }

//     //
//     // These are the functions we are exposing from the database closure
//     //
//     return {
//         verifyJWTToken,
//         newVerifyJWTToken,
//         verifyToken,
//         createToken,
//         hashPassword,
//         comparePasswords,
//         parseCookie,
//         handleAuthCookies
//   };
// }

// module.exports.tokens = tokens;
