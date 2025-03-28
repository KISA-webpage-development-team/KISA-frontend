import client from '@/shared/lib/axios/client';
import {User} from '@/types/user';

/**
 * @desc Fetch user data by email
 * @route GET /users/:email/
 */
export async function getUser(
  email: string,
  token: string,
): Promise<User | undefined> {
  const url = `/users/${email}/`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
