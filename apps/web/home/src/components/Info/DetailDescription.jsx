"use client";

import React from "react";
import { sejongHospitalLight } from "../../utils/fonts/textFonts";

export default function DetailDescription({ id = null, desc }) {
  if (id === "greek_town") {
    return (
      <div
        className={`${sejongHospitalLight.className} text-sm sm:text-base md:text-lg lg:text-xl 
      flex flex-col items-center text-center max-w-4xl`}
      >
        <div className="">
          <div className="">
            <span>
              (1) 다운타운 안에 위치한 그릭 타운에서는 그리스에서 접할 수 있는
              것보다 더 맛있는 그리스식 지중해 식사를 저렴한 가격에 할 수
              있습니다.
              <br />
              <br />
              (2) 디트로이트에서 가장 오래된 카지노인 할리우드 카지노 (Hollywood
              Casino at Greektown)도 있습니다.
              <br />
              <br />
            </span>
            <span className="flex text-center w-full justify-center">
              (3) 유명한 레스토랑으로는 The New Parthenon, The Golden Fleece
              <span className="cursor-text">,</span>
            </span>
          </div>

          <span>
            Cyprus Taverna, Pegasus Taverna, Pizza Papalis, Fishbone’s Rhythm
            Kitchen Cafe 등이 있습니다.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${sejongHospitalLight.className} text-sm sm:text-base md:text-lg lg:text-xl 
    flex flex-col items-center text-center max-w-4xl`}
    >
      {desc}
    </div>
  );
}
