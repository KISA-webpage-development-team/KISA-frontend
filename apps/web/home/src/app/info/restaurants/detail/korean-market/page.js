import React from "react";
import DetailThumbnail from "../../../../../components/Info/DetailThumbnail";
import DetailTitle from "../../../../../components/Info/DetailTitle";
import DetailDescription from "../../../../../components/Info/DetailDescription";

import { restaurantsKoreanMarketData } from "../../../../../config/static/detailPageData";
import "../../../info.css";

export default function KoreanMarketDetail() {
  return (
    <section className="detail_section">
      {restaurantsKoreanMarketData.map(({ id, title, desc }, _) => (
        <div id={id} key={id} className="flex flex-col w-full items-center ">
          {/* 1. Detail Thumbnail Image */}
          <DetailThumbnail id={id} />
          <div className="detail_text">
            {/* 2. Detail Section Title */}
            <DetailTitle title={title} />
            {/* 3. Detail Section Description  */}
            <DetailDescription desc={desc} />
          </div>
        </div>
      ))}
    </section>
  );
}
