import Image from "next/image";
import React from "react";

// sub-ui components
import DetailThumbnail from "../../../../../components/Info/DetailThumbnail";
import DetailTitle from "../../../../../components/Info/DetailTitle";
import DetailDescription from "../../../../../components/Info/DetailDescription";

import { campusCentralData } from "../../../../../config/static/detailPageData";
import DetailPageTitle from "../../../../../components/Info/DetailPageTitle";
import "../../../info.css";

export default function CentralCampusDetail() {
  return (
    <section className="detail_section">
      {/* <DetailPageTitle title="Central Campus" /> */}
      {campusCentralData.map(({ id, title, desc }, _) => (
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
