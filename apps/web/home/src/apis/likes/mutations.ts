import client from "@/lib/axios/client";
import { DeleteLikeParams, NewLikeBody } from "@/types/like";

type Token = string | undefined;
/**
 * @desc create a like on post or comment
 * @route POST /likes/{id}/
 */
export async function createLike(id: number, body: NewLikeBody, token: Token) {
  // TODO: separate body type to "types" folder
  const url = `/likes/${id}/`;
  try {
    const response = await client.post(url, body, {
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
 * @desc delete a like on post or comment
 * @route DELETE /likes/{id}/?email={email}&target={target}
 * @example
 */
export async function deleteLike(
  id: number,
  params: DeleteLikeParams,
  token: Token
) {
  const url = `/likes/${id}/?email=${params.email}&target=${params.target}`;

  try {
    const response = await client.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, message: "Like deleted successfully" };
  } catch (error) {
    return undefined;
  }
}
