import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";
import SubTeamCard from "./SubTeamCard";

export default function TeamMembersList({ team, name }) {
  return (
    <div className="flex flex-col items-center gap-8">
      <p className={`${sejongHospitalBold.className} text-xl md:text-2xl`}>
        {name}
      </p>
      <ul className="flex flex-col gap-8">
        {team.map(({ role, members }, index) => (
          <div key={`${role} - ${index}`}>
            <SubTeamCard role={role} members={members} />
          </div>
        ))}
      </ul>
    </div>
  );
}
