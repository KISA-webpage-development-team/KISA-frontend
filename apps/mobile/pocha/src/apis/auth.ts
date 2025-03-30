import client from '@/shared/lib/axios/client';
import {AxiosResponse} from 'axios';
import {User} from '@/types/user';

export async function getUserExists(email: string): Promise<AxiosResponse> {
  const url = `/auth/userExists/${email}`;

  try {
    const result = await client.get(url);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function createNewUser(
  userData: Omit<User, 'created'>,
): Promise<AxiosResponse> {
  const url = `/auth/signup/`;

  try {
    const result = await client.post(url, userData);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
