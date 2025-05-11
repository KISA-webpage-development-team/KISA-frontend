"use client";

import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

export default function SubTeamCard({ role, members }) {
  return (
    <div
      className="border border-black text-center gap-1
    flex flex-col justify-center items-center px-6 py-4"
    >
      <p className={`${sejongHospitalBold.className} text-xl md:text-2xl`}>
        {role}
      </p>
      <ul className="flex flex-col text-center gap-2">
        {members.map(({ isLead, name, major, year }, index) => (
          <li key={`${name}-${index}`}>
            {isLead ? (
              <div className="flex flex-col">
                <span
                  className={`${sejongHospitalLight.className} :text-base`}
                >{`Lead: ${name}`}</span>
                <span className={`${sejongHospitalLight.className} :text-base`}>
                  {`(${major}, ${year})`}
                </span>
              </div>
            ) : name === "Jioh In" ? (
              <span
                className={`${sejongHospitalLight.className} text-base cursor-pointer`}
              >{`${name} (${major}, ${year})`}</span>
            ) : (
              <span
                className={`${sejongHospitalLight.className} text-base`}
              >{`${name} (${major}, ${year})`}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
