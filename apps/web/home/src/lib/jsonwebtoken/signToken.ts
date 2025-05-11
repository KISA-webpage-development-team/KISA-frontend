import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./env";

// For better security, we are adding additional JWT token with 7d expiration to the user session
// This signed token will be used to protect backend API calls
const signToken = async (email: string): Promise<string> => {
  const token = await jwt.sign({ id: email }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

export default signToken;
