// starting with "/images" endpoint

import client from "@/lib/axios/client";

/**
 * @desc  Upload image to S3 using presigned URL
 * @route presigned_url
 */
export async function putImageToS3(
  presigned_url: string,
  file: File
): Promise<void> {
  try {
    await client.put(presigned_url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
