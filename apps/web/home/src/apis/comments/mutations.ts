import client from "@/lib/axios/client";
import { NewCommentBody, UpdateCommentBody } from "@/types/comment";

type Token = string | undefined;

// TODO: Add return type { success: boolean, message: string }

/**
 * @desc Create a comment
 * @route POST /comments/{postid}/
 * @example
 * valid: { message: "Comment posted successfully" }
 * invalid: 401, { message: "comment not created" }
 */
export async function createComment(
  postid: number,
  body: NewCommentBody,
  token: Token
) {
  const url = `/comments/${postid}/`;
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
 * @desc Update a comment
 * @route PUT /comments/{commentid}/
 * @example
 * valid: { commentid: 192, text: "test2" }
 */
export async function updateComment(
  commentid: number,
  body: UpdateCommentBody,
  token: Token
) {
  // const url = `/comments/${postid}/`;
  const url = `/comments/${commentid}/`;
  try {
    const response = await client.put(url, body, {
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
 * @desc Delete a comment
 * @route DELETE /comments/{commentid}/
 * @example
 * valid: 204, data: ""
 */
export async function deleteComment(commentid: number, token: Token) {
  // const url = `/comments/${postid}/`;
  const url = `/comments/${commentid}/`;
  try {
    const response = await client.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, message: "Comment deleted successfully" };
  } catch (error) {
    //console.error(error);
    return undefined;
  }
}
