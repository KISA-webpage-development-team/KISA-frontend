import React from "react";
import {
  sejongHospitalLight,
  sejongHospitalBold,
} from "../../../utils/fonts/textFonts";
import InfoTitle from "../../../components/shared/InfoTitle";
import SectionTitle from "../../../components/Info/SectionTitle";
import SectionGrid from "../../../components/Info/SectionGrid";
import { campusPageData } from "../../../config/static/infoPageData";
import SectionIntro from "../../../components/Info/SectionIntro";
import "../info.css";

export const metadata = {
  title: "캠퍼스 정보",
  description: "미시간 대학교의 다양한 캠퍼스들",
};

export default function CampusInfoPage() {
  const { infoType, infoTitle, sections } = campusPageData;

  return (
    <section className="pt-3 md:pt-4 lg:pt-5">
      {/* Information title section divider */}
      <InfoTitle title={infoTitle} />

      {/* Intro + Description */}
      <div className="intro_and_desc">
        <div
          className={`${sejongHospitalBold.className} text-xl md:text-2xl lg:text-3xl`}
        >
          캠퍼스 정보
        </div>
        <p
          className={`${sejongHospitalLight.className} text-center text-base md:text-lg lg:text-xl`}
        >
          재학생들은 대부분 캠퍼스 내의 빌딩을 풀네임보다는 줄여서 부르거나
          이니셜로 부릅니다. <br />
          수강 신청 후 Wolverine Access 에서 볼 수 있는 시간표에서도 마찬가지로
          이니셜을 확인하실 수 있습니다. <br />
          아래에서 각 빌딩의 줄임말 혹은 이니셜과 더불어 빌딩 정보를 확인하실 수
          있습니다.
        </p>
      </div>

      {/* Sections: Central Campus + North Campus */}
      <div className="section_list">
        {sections.map((section, index) => {
          const { sectionName, sectionText, sectionIntro, contentList } =
            section;
          return (
            <div key={index} className="section_list_item">
              <SectionTitle
                infoType={infoType.toLowerCase()}
                sectionName={sectionName}
                sectionText={sectionText}
              />
              <SectionIntro sectionIntro={sectionIntro} />
              <SectionGrid
                infoType={infoType.toLowerCase()}
                sectionName={sectionName}
                contentList={contentList}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
