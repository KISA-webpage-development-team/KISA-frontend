// axios GET API calls
// starting with "/auth" endpoint

import client from "@/lib/axios/client";

// NOTE: getIsAdmin doesn't use SWR

/**
 * @desc Get user's admin status
 * @route GET /auth/isAdmin/:email
 * @example
 * valid: { message: "user is admin" }
 * invalid: 401, { message: "user is not admin" }
 * missing token: 401, { error: "Decode failed" }
 */
export async function getIsAdmin(email: string, token: string) {
  if (!token) return;

  const url = `/auth/isAdmin/${email}`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    return;
  }
}
