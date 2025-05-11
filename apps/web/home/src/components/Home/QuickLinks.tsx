"use client";

import React from "react";
import { homeQuickLinksData as items } from "../../config/static/homePageData";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";

import Carousel from "react-multi-carousel";
import "./test.css";

export default function QuickLinks() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 300 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const navigateToLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div
      className={`w-full
    flex flex-col gap-4 ${sejongHospitalBold.className}`}
    >
      <h2 className="section_title">Quick Links</h2>

      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        partialVisible={false}
        infinite={true}
        className="relative"
        itemClass="py-1 px-1"
      >
        {items.map((item, index) => (
          <Card
            key={item.id}
            isFooterBlurred
            radius="lg"
            className="max-w-32 md:max-w-full w-[80%] md:w-[90%] 
            border border-black/10 hover:border-michigan-blue/50
            aspect-square relative flex flex-col bg-transparent shadow-md"
            isPressable
            onPress={() => navigateToLink(item.url)}
            draggable={false} // Set draggable to false to prevent individual cards from being draggable
          >
            <Image
              className="h-full object-contain"
              src={`/quick_links/${item.id}.png`}
              alt={item.title}
              width={500}
              height={500}
            />
          </Card>
        ))}
      </Carousel>
    </div>
  );
}
