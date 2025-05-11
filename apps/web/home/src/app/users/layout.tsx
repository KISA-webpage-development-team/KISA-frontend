import { SWRTokenProvider } from "@/lib/swr/providers";

export default function UserLayout({ children }) {
  // "/users" 페이지들은 모두 token을 사용해 GET API call을 하므로,
  // SWRTokenProvider를 사용하도록 설정
  return <SWRTokenProvider>{children}</SWRTokenProvider>;
}
