// starting with "/images" endpoint

import client from "@/lib/axios/client";
import {
  PostPresignedURLRequestBody,
  PostPresignedURL,
  GetPresignedURL,
} from "@/types/images";

/**
 * @desc  Request a presigned URL to upload an image to S3
 * @route POST /images/presigned_url/
 */
export async function postPresignedURL(
  token: string | undefined,
  body: PostPresignedURLRequestBody
): Promise<PostPresignedURL | undefined> {
  const url = "/images/presigned_url/";
  try {
    const response = await client.post(url, body, {
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
 * @desc  Request a presigned URL of a file uploaded to S3
 * @route GET /images/presigned_url/
 */
export async function getPresignedURL(
  token: string | undefined,
  { fileKey, fileType }: PostPresignedURLRequestBody
): Promise<GetPresignedURL | undefined> {
  const url = `/images/presigned_url/?fileKey=${fileKey}&fileType=${fileType}`;
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
