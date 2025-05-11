import React from "react";
import SectionTitle from "../../../components/Info/SectionTitle";
import SectionGrid from "../../../components/Info/SectionGrid";
import InfoTitle from "../../../components/shared/InfoTitle";
import { travelPageData } from "../../../config/static/infoPageData";
import SectionIntro from "../../../components/Info/SectionIntro";
import "../info.css";

export const metadata = {
  title: "여행",
  description:
    "미시간 대학교를 다니면서 여행할 수 있는 장소들에 대한 정보입니다. 미시간 주 뿐만 아니라 캐나다, 시카고와 같은 다양한 도시들과 명소들을 소개합니다.",
};

export default function TravelPage() {
  const { infoType, infoTitle, sections } = travelPageData;

  return (
    <section className="pt-3 md:pt-4 lg:pt-5">
      {/* Information title section divider */}
      <InfoTitle title={infoTitle} />

      {/* Sections: Ann Arbor + Detroit + 근교 도시 및 명소 */}
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
