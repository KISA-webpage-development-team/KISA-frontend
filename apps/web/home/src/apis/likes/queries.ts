import client from "@/lib/axios/client";
import { LikeBody } from "@/types/like";

type Token = string | undefined;

/**
 * @desc Get whether the user liked the post/comment  or not
 * @route GET /likes/{id}/
 * @example
 */
export async function getLikeByUser(
  id: number,
  params: LikeBody,
  token: Token
) {
  const url = `/likes/${id}/?email=${params.email}&target=${params.target}`;

  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    //console.error(error);
    return undefined;
  }
}

/**
 * @desc Get the number of likes on a post
 * @route GET /posts/likes/<int:postid>/
 * @returns { likesCount: number }
 */
export async function getPostLikesCount(postid: number) {
  const url = `/posts/likes/${postid}/`;
  try {
    const response = await client.get(url);
    return response?.data;
  } catch (error) {
    // console.error(error);
    return undefined;
  }
}

/**
 * @desc Get the number of likes on a comment
 * @route GET /comments/likes/<int:commentid>/
 * @returns { likesCount: number }
 */
export async function getCommentLikesCount(commentid: number) {
  const url = `/comments/likes/${commentid}/`;
  try {
    const response = await client.get(url);
    return response?.data;
  } catch (error) {
    // console.error(error);
    return undefined;
  }
}
