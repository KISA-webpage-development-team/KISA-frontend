// // import jwt from 'jsonwebtoken';
// // import {JWT_SECRET_KEY} from '@env';

// // // For better security, we are adding additional JWT token with 7d expiration to the user session
// // // This signed token will be used to protect backend API calls
// // const signToken = async (email: string): Promise<string> => {
// //   const token = await jwt.sign({id: email}, JWT_SECRET_KEY, {
// //     expiresIn: '7d',
// //   });
// //   return token;
// // };

// // export default signToken;

// import {fromByteArray} from 'base64-js';
// import {hmacSHA256} from 'react-native-hmac';
// import {JWT_SECRET_KEY} from '@env';

// // Helper: base64url encode
// export const base64url = (input: Uint8Array): string => {
//   return fromByteArray(input)
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_')
//     .replace(/=+$/, '');
// };
// // Helper: stringify then base64url encode
// const encodeJSON = (obj: Record<string, any>) =>
//   base64url(new Uint8Array(Buffer.from(JSON.stringify(obj))));

// const signToken = async (email: string): Promise<string> => {
//   console.log('signing token...');
//   const header = {
//     alg: 'HS256',
//     typ: 'JWT',
//   };

//   const payload = {
//     id: email,
//     iat: Math.floor(Date.now() / 1000),
//     exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
//   };

//   const headerEncoded = encodeJSON(header);
//   const payloadEncoded = encodeJSON(payload);

//   const data = `${headerEncoded}.${payloadEncoded}`;

//   console.log('data: ', data);

//   const signature = await hmacSHA256(data, JWT_SECRET_KEY); // returns hex
//   const signatureBase64url = base64url(
//     new Uint8Array(Buffer.from(signature, 'hex')),
//   );

//   console.log('signatureBase64url: ', signatureBase64url);

//   const jwt = `${data}.${signatureBase64url}`;

//   console.log('jwt', jwt);
//   return jwt;
// };

// export default signToken;

import {JWT_SECRET_KEY} from '@env';
import {sign} from 'react-native-pure-jwt';

export default async function signToken(email: string) {
  try {
    const token = await sign(
      {
        id: email,
        exp: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // 7 days
        additional: 'payload',
      }, // body
      JWT_SECRET_KEY, // secret
      {
        alg: 'HS256',
      },
    );

    return token;
  } catch (error) {
    console.error('Error signing token: ', error);
    throw error;
  }
}
