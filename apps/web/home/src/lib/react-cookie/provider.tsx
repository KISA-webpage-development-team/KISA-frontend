import { CookiesProvider } from "react-cookie";

export default function ReactCookieProvider({ children }) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
