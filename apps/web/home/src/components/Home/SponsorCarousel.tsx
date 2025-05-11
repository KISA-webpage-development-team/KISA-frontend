"use client";
import React from "react";
import { sponsorData } from "@/config/static/sponsorData";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
import Image from "next/image";
import Link from "next/link";
import "react-multi-carousel/lib/styles.css";
import NextIconTail from "@/final_refactor_src/components/icon/NextIconTail";

// import Carousel from "react-multi-carousel";
import "./test.css";

// import Carousel from "shadcn/ui"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// import Card from "shadcn/ui"
import { Card, CardContent } from "@/components/ui/card";

export default function SponsorCarousel() {
  const getLogoImagePath = (sponsorID: string) => {
    return `/sponsor/logo/${sponsorID}.png`;
  };

  const handleSponsorClick = () => {
    window.open(
      "https://umich.qualtrics.com/jfe/form/SV_3pEWxPBxDOahdps",
      "_blank"
    );
  };

  return (
    <div
      className={`w-full
    flex flex-col gap-4 ${sejongHospitalBold.className}`}
    >
      <div className="flex flex-col gap-1">
        <span className="section_title">Sponsors</span>
        <p className={`${sejongHospitalLight.className} text-base md:text-lg`}>
          Proudly supported by leading organizations.
        </p>
      </div>
      <Carousel className="w-full">
        {/* For phone view, when only 3 box (it becomes scrollable) */}
        <CarouselContent className="flex snap-x scroll-smooth scrollbar-hide">
          {sponsorData.map((item, index) => (
            <CarouselItem
              key={index}
              className="snap-start basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="p-1">
                <Card className="border-3 border-[#31506E] rounded-3xl">
                  <Link href={item.url} target="_blank">
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      <Image
                        className="h-full object-contain"
                        src={getLogoImagePath(item.id)}
                        alt={item.title}
                        width={500}
                        height={500}
                      />
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* Become a Sponsor Button (directed to external form) */}
      <div className="flex w-full justify-end">
        <button
          className="flex items-center bg-[#31506E] gap-2
          px-7 md:px-10 py-2 md:py-3 
          rounded-xl hover:bg-[#1f3750]
          transition-all duration-200"
          onClick={handleSponsorClick}
        >
          <span
            className="text-white md:text-lg
         "
          >
            Become a Sponsor
          </span>
          <NextIconTail color="white" />
        </button>
      </div>
    </div>
  );
}
