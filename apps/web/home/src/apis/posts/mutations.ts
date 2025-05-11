// POST, PUT, PATCH, DELETE API calls for post

import client from "@/lib/axios/client";
import { NewPostBody, UpdatePostBody } from "@/types/post";

type Token = string | undefined;

// TODO: add return type as { success: boolean, message: string }

// Post --------------------------------------------------------------
/**
 * @desc  Create a post
 * @route POST /posts/
 */
export async function createPost(data: NewPostBody, token: Token) {
  const url = `/posts/`;

  try {
    const response = await client.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * @desc Update a post
 * @route PATCH /posts/:postid/
 */
export async function updatePost(
  postid: number,
  data: UpdatePostBody,
  token: Token
) {
  const url = `/posts/${postid}/`;
  try {
    const response = await client.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * @desc Delete a post
 * @route DELETE /posts/:postid/
 */
export async function deletePost(postid: number, token: Token) {
  const url = `/posts/${postid}/`;
  try {
    const response = await client.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

// Post: Read Count --------------------------------------------------------------
/**
 * @desc Increase the read count of a post
 * @route PATCH /posts/readCount/:postid/
 */
export async function incrementReadCount(postid: number) {
  const url = `/posts/readCount/${postid}/`;
  // in patch method, the second parameter is the data to be sent (in this case, it's empty)
  try {
    const response = await client.patch(url);
    return response;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
