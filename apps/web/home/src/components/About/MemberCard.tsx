"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

export default function MemberCard({ role, name, major, year }) {
  return (
    <Card className="flex flex-col md:py-4 bg-[#eeeeee] shadow-none h-full">
      <CardBody className="flex flex-row md:flex-col items-center gap-1 overflow-visible py-2 h-full">
        <Image
          alt="Profile Images"
          className="w-24 h-24 md:w-60 md:h-60 rounded-full object-cover"
          src="/kisa_logo.png"
          width={200}
          height={200}
        />

        <div className="flex flex-col justify-center items-center w-full">
          {/* Name & Major Section (Ensures they are centered) */}
          <div className="flex flex-col items-center text-center">
            <span
              className={`${sejongHospitalBold.className} text-lg sm:text-2xl`}
            >
              {name}
            </span>
            <span
              className={`${sejongHospitalLight.className} text-sm sm:text-lg md:text-lg mt-1`}
            >
              {`${major} | ${year}`}
            </span>
          </div>

          {/* Role Container (Centered & aligned properly) */}
          <div className="flex flex-col items-center justify-center w-full ">
            {Array.isArray(role) ? (
              role.map((r, index) => (
                <span
                  key={index}
                  className={`${sejongHospitalBold.className}  text-[#31506E] sm:text-lg`}
                >
                  {r}
                </span>
              ))
            ) : (
              <span>{role}</span>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
