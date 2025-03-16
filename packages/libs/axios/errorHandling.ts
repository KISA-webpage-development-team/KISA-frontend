import { AxiosError } from "axios";
import { ApiError } from "./types";

export function handleApiError(error: unknown, context: string): ApiError {
  if (error instanceof AxiosError) {
    switch (error.response?.status) {
      case 401:
        console.error(
          `${context}: Unauthorized - Please check your authentication`
        );
        return { statusCode: 401 };
        break;
      case 404:
        console.error(`${context}: Resource not found`);
        return { statusCode: 404 };
        break;
      case 400:
        console.error(`${context}: Bad request -`, error.response?.data);
        return { statusCode: 400 };
        break;
      case 500:
        console.error(`${context}: Server error -`, error.message);
        return { statusCode: 500 };
        break;
      default:
        console.error(`${context}: Error -`, error.message);
        return { statusCode: 500 };
    }
  } else {
    console.error(`${context}: Unexpected error -`, error);
    return { statusCode: 500 };
  }
}
