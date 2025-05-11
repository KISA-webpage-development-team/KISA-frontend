import React from "react";
import {
  sejongHospitalLight,
  sejongHospitalBold,
  arial,
} from "../../utils/fonts/textFonts";
import styles from "./aboutMainText.module.css";

export default function AboutMainText() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1
        className={`${styles.arialCaption} ${sejongHospitalBold.className} text-4xl md:text-5xl lg:text-6xl`}
      >
        About KISA
      </h1>
      <h3
        className={`${sejongHospitalBold.className} mt-12 md:mt-16 lg:mt-20 text-xl md:text-2xl lg:text-3xl 
        break-words text-center`}
      >
        Korean International Students Association at the University of Michigan
      </h3>
      <div className="flex flex-col mt-[50px] gap-[50px] text-center px-6 md:px-16 lg:px-20 text-lg md:text-xl lg:text-2xl">
        <p className={`${sejongHospitalLight.className}`}>
          안녕하십니까, 미시간 대학교 학부 한인 학생회 KISA입니다. 1998년에
          설립된 이래, 현재까지 5000명 가량의 한인 학부생들을 대표하고 있는
          KISA는 미시간 대학교에 재학중인 한인 학생들간의 긴밀한 공동체를
          조성하고, 귀중한 기회와 자원을 제공함으로써 한국인 유학생들에게 힘을
          실어주기 위해 노력합니다.
        </p>

        <p className={`${arial.className} italic mx-auto`}>
          “KISA is a student-driven organization dedicated to empowering Korean
          international students by fostering a tight-knit community and
          providing valuable opportunities and resources.”
        </p>
        <p className={`${sejongHospitalLight.className}`}>
          한인 유학생들의 유익하고 편리한 학교생활을 위해 힘쓰며, 학부생을
          비롯하여 캠퍼스 내외로 한인들 간의 다양한 교류가 원활하게 이루어질 수
          있도록 기회의 장을 형성하고, 더 나아가 필요에 따라 국내외 정세에 대한
          미시간 한인학생들의 목소리를 대변하는것을 목표로 합니다.
        </p>
      </div>
    </div>
  );
}
