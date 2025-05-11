"use client";

import OnlyMobileView from "@/final_refactor_src/components/feedback/OnlyMobileView";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function PochaLayout({ children }) {
  // except for /pocha/dashboard, only mobile view is allowed
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <SessionProvider>
      {/* ✅ /dashboard is tablet view, others are mobile view restrictions applied */}
      {isDashboard ? (
        <div className="w-full">{children}</div>
      ) : (
        <>
          {/* This message only shows on larger screens */}
          <div className="hidden md:block">
            <OnlyMobileView />
          </div>
          {/* Main content for mobile screens */}
          <div
            className={`md:hidden h-full
               ${sejongHospitalLight.className} overflow-visible`}
          >
            {children}
          </div>
        </>
      )}
    </SessionProvider>
  );
}
