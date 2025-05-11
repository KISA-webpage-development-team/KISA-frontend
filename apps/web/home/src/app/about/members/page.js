"use client";

import React from "react";
import InfoTitle from "@/components/shared/InfoTitle";
import { Select, SelectItem } from "@nextui-org/react";

import MemberCard from "@/components/About/MemberCard";
import { members_2024, members_2023 } from "@/config/static/memberPageData";
import { useState } from "react";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";

export default function MemberPage() {
  const membersData = {
    "24-25": members_2024,
    "23-24": members_2023,
  };

  const sortedYears = Object.keys(membersData).sort((a, b) => b - a);

  // To select the most recent year
  const [selectedYear, setSelectedYear] = useState(sortedYears[0]);

  const handleSelectChange = (keys) => {
    // if selected year is same as the current year, do nothing
    if (keys.values().next().value === undefined) {
      return;
    }

    setSelectedYear(keys.values().next().value);
  };

  const selectedMembers = membersData[selectedYear];

  const allMembers = selectedMembers && [
    ...selectedMembers?.presidents.map((member) => ({
      ...member,
      section: "presidents",
    })),
    ...selectedMembers?.operations.map((member) => ({
      ...member,
      section: "operations",
    })),
    ...selectedMembers?.public_relations.map((member) => ({
      ...member,
      section: "public_relations",
    })),
  ];

  return (
    <section className="">
      <div
        className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
    gap-8 md:gap-16 bg-yellow"
      >
        <InfoTitle title={`${selectedYear} Board`} />
      </div>
      <div className="flex justify-end -mt-2">
        <Select
          className="max-w-xs"
          classNames={{
            trigger: "border border-black px-5 py-2 !min-h-0",
            label: `${sejongHospitalLight.className} text-black text-lg hidden`,
            selectorIcon: "!w-5 !h-5",
            value: `${sejongHospitalLight.className} text-black text-lg`,
            listbox: `${sejongHospitalLight.className} text-black`,
          }}
          label="Select Year"
          labelPlacement="outside"
          variant="bordered"
          radius="full"
          selectedKeys={selectedYear ? new Set([selectedYear]) : new Set()}
          onSelectionChange={handleSelectChange}
        >
          {Object.keys(membersData).map((year) => (
            <SelectItem key={year}>{year}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Grid Style Cards Display */}
      <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-20 md:gap-y-[60px] mt-2">
        {allMembers?.map(({ name, major, year, role }, index) => (
          <MemberCard
            key={index}
            role={role}
            name={name}
            major={major}
            year={year}
          />
        ))}
      </div>
    </section>
  );
}
