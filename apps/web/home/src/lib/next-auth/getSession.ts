import { getServerSession } from "next-auth";
import authOptions from "./authOptions";
import { UserSession } from "./types";

/**
 * @desc Get the user session from server-side
 */
export const getSession = async (): Promise<UserSession | null> => {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    // TODO: need error handling
    console.error("Error in `[auth] getSession` ", error);
    return null;
  }
};
