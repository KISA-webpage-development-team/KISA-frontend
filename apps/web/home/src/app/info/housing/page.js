import React from "react";
import InfoTitle from "../../../components/shared/InfoTitle";

import SectionGrid from "../../../components/Info/SectionGrid";
import SectionTitle from "../../../components/Info/SectionTitle";
import SectionIntro from "../../../components/Info/SectionIntro";

import {
  housingPageOnCampusData,
  housingPageOffCampusData,
} from "../../../config/static/infoPageData";
import "../info.css";

export const metadata = {
  title: "하우징",
  description:
    "미시간 대학교의 하우징 정보들입니다. On-Campus와 Off-Campus로 나뉩니다. 기숙사별 다양한 정보들과, 랜드마크, 타워플라자를 비롯한 오프 캠퍼스 하우징에 대한 자세한 설명을 확인할 수 있습니다.",
};

export default function HousingPage() {
  const infoType = "housing";
  const { sections: onCampusSections } = housingPageOnCampusData;

  const { sections: offCampusSections } = housingPageOffCampusData;

  return (
    <section className="pt-3 md:pt-4 lg:pt-5">
      {/* Information title section divider */}
      <InfoTitle title="Housing" />
      {/* Sections: On Campus + Off Campus */}
      <div className="mt-8 md:mt-10 lg:mt-12">
        <SectionTitle
          infoType={infoType.toLowerCase()}
          sectionName="on-campus"
          sectionText="On-Campus Housing"
        />
      </div>

      <div className="section_list">
        {/* On-Campus Housing */}

        {/* Sub Sections: Central + Hill + North */}
        {onCampusSections.map((section, index) => {
          const { sectionName, sectionText, sectionIntro, contentList } =
            section;
          return (
            <div key={index} className="section_list_item">
              <SectionTitle
                align="left"
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

      <div className="mt-24 md:mt-28 lg:mt-32">
        <SectionTitle
          infoType={infoType.toLowerCase()}
          sectionName="off-campus"
          sectionText="Off-Campus Housing"
        />
      </div>

      <div className="section_list">
        {/* Off-Campus Housing */}

        {offCampusSections.map((section, index) => {
          const { sectionName, sectionText, sectionIntro, contentList } =
            section;
          return (
            <div key={index} className="section_list_item">
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
