'use client';

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface LayoutProps {
  children: ReactNode;
}

// post-view page doesn't require token on GET API calls
export default function PayPageLayout({ children }: LayoutProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
