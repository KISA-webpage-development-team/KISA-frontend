// `env.ts`
// : all of the environment variables (.env, .env.local) are loaded here
// and exported to be used in the app.

// Google Auth
export const GOOGLE_ID = process.env.GOOGLE_ID ? process.env.GOOGLE_ID : "";
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET
  ? process.env.GOOGLE_SECRET
  : "";

// Google Calendar
export const GOOGLE_CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID
  ? process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID
  : "";
export const GOOGLE_CALENDAR_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
  ? process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
  : "";

// Backend
const useLocalBackend = process.env.NEXT_PUBLIC_USE_LOCAL_BACKEND === "true";
export const BACKEND_URL = useLocalBackend
  ? process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL
  : process.env.NEXT_PUBLIC_BACKEND_URL;

// Stripe
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

// WebSocket
const useLocalWebsocket =
  process.env.NEXT_PUBLIC_USE_LOCAL_WEBSOCKET === "true";
export const WEBSOCKET_URL = useLocalWebsocket
  ? process.env.NEXT_PUBLIC_LOCAL_WEBSOCKET_URL
  : process.env.NEXT_PUBLIC_WEBSOCKET_URL;
