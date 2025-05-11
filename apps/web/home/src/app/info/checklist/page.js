// 처음 와서 할 일
import React from "react";

// sub-ui components
import InfoTitle from "../../../components/shared/InfoTitle";
import CheckList from "../../../components/Info/CheckList";

import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../../utils/fonts/textFonts";

import "../info.css";

export const metadata = {
  title: "처음 와서 할 일",
  description:
    "미시간 대학교에 처음 와서 할 체크 리스트입니다. 신입생을 위한 정보 뿐만 아니라, 운전면허, 신분증 등 다양한 유용한 정보들이 있습니다.",
};

export default function InfoCheckListPage() {
  return (
    <section className="pt-3 md:pt-4 lg:pt-5">
      <InfoTitle title="Things to Do" />

      {/* Intro + Description */}
      <div
        className="flex flex-col gap-8 md:gap-10 lg:gap-12 items-center 
mt-8 md:mt-10 lg:mt-12 w-11/12 md:w-10/12 lg:w-9/12 px-2 md:px-4 lg:px-6"
      >
        <h1
          className={`${sejongHospitalBold.className} text-xl md:text-2xl lg:text-3xl`}
        >
          신입생이 입학 전에 해야 할 일
        </h1>
        <p
          className={`${sejongHospitalLight.className} text-center text-base md:text-lg lg:text-xl`}
        >
          우선 미시간 대학교에 합격하신 것을 축하드립니다! <br />
          Offer Letter 를 받고 어떤 것부터 해야 될지 막막하실 여러분들을 위해
          타임라인 예시와 어떤 것을 해야 하는지 정리했습니다. 대부분의 것들을
          작성했지만 해마다 필요한 정보 및 제출해야 할 서류가 다를 수 있기에
          정확한 정보는 꼭 학교 공식 이메일 혹은 웹사이트를 통해서 확인해 주시기
          바랍니다.
          <br />
          <br />* 아래 타임라인은 2022년 Fall 입학 기준으로 작성된 글입니다.
        </p>
      </div>

      <div
        className="flex flex-col items-center gap-12 w-full
      mt-12 md:mt-14 lg:mt-16 px-0 md:px-4 lg:px-8"
      >
        <h2
          className={`${sejongHospitalBold.className} text-xl md:text-2xl lg:text-3xl`}
        >
          [Checklist]
        </h2>

        {/* dropdown checklist */}
        <CheckList />
      </div>
    </section>
  );
}
