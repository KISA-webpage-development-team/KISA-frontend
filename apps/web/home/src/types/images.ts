interface PostPresignedURLRequestBody {
  fileKey: string;
  fileType: string;
}

interface PostPresignedURL {
  presignedURL: string;
}

interface GetPresignedURL {
  fileURL: string;
}

export type { PostPresignedURLRequestBody, PostPresignedURL, GetPresignedURL };
