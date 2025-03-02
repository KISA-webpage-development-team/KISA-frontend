// `axios/types.ts`: any axios-related type code

import { AxiosError } from "axios";

// custom error message from Flask Backend
// When sending error codes from the backend,
// they are sent in JSON format as shown below
interface CustomServerError {
  error: string;
}

interface ApiError {
  statusCode: number;
}

export type CustomAxiosError = AxiosError<CustomServerError>;
export type { ApiError };
