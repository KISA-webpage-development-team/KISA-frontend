import { Session } from "next-auth";

// Custom user session type
// for better security, we have `token` field in the session, which can be passed to the backend through headers
export interface UserSession extends Session {
  token?: string;
}
