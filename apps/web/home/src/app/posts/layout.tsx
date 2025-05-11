import { ReactNode } from "react";
import { SWRTokenProvider } from "@/lib/swr/providers";
import "./posts.css";

interface LayoutProps {
  children: ReactNode;
}

export default async function PostLayout({ children }: LayoutProps) {
  return <SWRTokenProvider>{children}</SWRTokenProvider>;
}
