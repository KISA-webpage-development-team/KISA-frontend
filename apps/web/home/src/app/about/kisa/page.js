// 1. 단체 사진
// 2. 텍스트

import React from "react";
import AboutMainText from "../../../components/About/AboutMainText";
import KisaAll from "../../../components/About/KisaAll";

export const metadata = {
  title: "소개",
  description:
    "키사 (KISA) 소개 페이지입니다. 인사말과 키사가 하는 일들이 간단히 정리 되어있습니다.",
};

export default function KisaPage() {
  return (
    <section
      className="flex flex-col mb-16 md:mb-24 lg:mb-32
"
    >
      {/* link is for Kepler adobe font */}
      <div className="flex justify-center w-screen bg-[#00274C] self-center">
        <KisaAll />
      </div>

      {/* 텍스트 */}
      {/* <h1 className="example">About KISA</h1> */}
      <div className="flex justify-center mt-[72px]">
        <AboutMainText />
      </div>
    </section>
  );
}
