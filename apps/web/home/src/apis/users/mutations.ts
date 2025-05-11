// POST, PUT, PATCH, DELETE API calls for user

import client from "@/lib/axios/client";

// Types
import { UserEditableFields } from "@/types/user";

/**
 * @desc Update user information
 * @route PATCH /users/:email/
 */
export async function updateUser(
  email: string,
  data: UserEditableFields,
  token: string | null
) {
  const url = `/users/${email}/`;

  try {
    const response = await client.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}
