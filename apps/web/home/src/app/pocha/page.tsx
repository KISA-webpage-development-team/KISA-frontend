"use client";

import React, { useState } from "react";

// ui components
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import HomeHeading from "@/features/pocha/components/home/HomeHeading";
import HomeTabs from "@/features/pocha/components/home/HomeTabs";
import HomeTabContent from "@/features/pocha/components/home/HomeTabContent";

// hooks
import { useSearchParams } from "next/navigation";
import usePocha from "@/features/pocha/hooks/usePocha";

// types
import { PochaTab } from "@/types/pocha";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

export default function PochaPage() {
  // "/pocha?tab=menu" [default] or "/pocha?tab=orders"
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PochaTab>(
    (searchParams.get("tab") as PochaTab) || "menu"
  );

  // fetch pocha information (GET /pocha/status-info/)
  const { pochaInfo, status, error } = usePocha();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  // Error Handling using error.tsx,
  // just throw the error, and it will be handled by error.tsx
  if (status === "error") {
    throw new Error(error || "Unexpected error occurred");
  }

  // [TODO] better UI
  // if pochaInfo === {}, then there is no scheduled pocha
  if (Object.keys(pochaInfo).length === 0) {
    return (
      <section className="flex justify-center items-center h-full">
        <p className={`text-3xl ${sejongHospitalBold.className}`}>
          No scheduled pocha
        </p>
      </section>
    );
  }

  // [TODO] better UI
  // else if pochaInfo.ongoing === false, then show the upcoming pocha
  if (pochaInfo?.ongoing === false) {
    return (
      <section className="flex justify-center items-center h-full">
        <p className={`text-3xl ${sejongHospitalBold.className}`}>
          Upcoming pocha
        </p>
        <HomeHeading pochaInfo={pochaInfo} />
      </section>
    );
  }

  return (
    <section
      className={`
        md:hidden flex flex-col min-h-screen
        relative !gap-0`}
    >
      {/* PochaHeading (at the top, disappear when scrolling) */}
      <div className="relative z-10 flex-shrink-0">
        <HomeHeading pochaInfo={pochaInfo} />
      </div>

      {/* Sticky Tabs (fixed at the top) */}
      <div className="sticky top-0 z-50 bg-white">
        <HomeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area (scrollable) */}
      <div className="flex-1">
        <HomeTabContent activeTab={activeTab} pochaID={pochaInfo?.pochaID} />
      </div>
    </section>
  );
}
