// GET API Axios calls
// starting with "/users" endpoint

// ---------------------------------------------------------------------------
// Types
import { User } from "@/types/user";
import { UserBoardPost } from "@/types/post";
import { Comment } from "@/types/comment";
import client from "@/lib/axios/client";

/**
 * @desc Fetch user data by email
 * @route GET /users/:email/
 */
export async function getUser(
  email: string,
  token: string
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

/**
 * @desc Fetch user posts by email
 * @route GET /users/:email/posts/
 */
export async function getUserPosts(
  email: string,
  token: string
): Promise<UserBoardPost[] | undefined> {
  // TODO: UserBoardPost -> SimplePost로 통일 (getBoardPosts와 동일한 리턴 타입을 가져야함)
  const url = `/users/${email}/posts/`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data?.posts;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/**
 * @desc Fetch user comments by email
 * @route GET /users/:email/comments/
 */
export async function getUserComments(
  email: string,
  token: string
): Promise<Comment[] | undefined> {
  const url = `/users/${email}/comments/`;
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
