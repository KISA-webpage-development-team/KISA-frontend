"use client";

import React, { useEffect, useRef, useState } from "react";
import { homeCarouselData as items } from "../../config/static/homePageData";
import Image from "next/image";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
import { motion } from "framer-motion";

export default function HomeCarousel() {
  const duration = 10000; // 10 seconds
  const frame = useRef(0);
  const firstFrameTime = useRef(performance.now());
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // animation + progress
  useEffect(() => {
    firstFrameTime.current = performance.now();
    frame.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, [active]);

  const animate = (now) => {
    let timeFraction = (now - firstFrameTime.current) / duration;

    if (timeFraction <= 1) {
      setProgress(timeFraction * 100);
      frame.current = requestAnimationFrame(animate);
    } else {
      timeFraction = 1;

      setProgress(0);
      setActive((active + 1) % items.length);
    }
  };

  return (
    <div
      className="
      w-full flex flex-col
      lg:flex-row"
    >
      <div
        className="lg:basis-[45%] aspect-[3/2] flex justify-center 
      transition-all duration-150 delay-300 ease-in-out
      "
      >
        {items.map(({ id, desc }, index) => (
          <motion.div
            key={`carousel-${id}`}
            initial={{
              x: active === index ? 0 : 50,
              opacity: active === index ? 1 : 0,
            }}
            animate={{
              x: active === index ? 0 : -50,
              opacity: active === index ? 1 : 0,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`relative w-full cursor-pointer  
             aspect-[12/8] 
               ${active === index ? "" : "hidden"}`}
            onClick={() => {
              if (items[active].url) {
                window.open(items[active].url, "_blank");
              }
            }}
          >
            <Image
              className="object-fit"
              src={`/carousel/${id}.png`}
              fill
              priority={index === active}
              alt={desc}
              sizes="100vw" // temporary fix for browser bug
            />
          </motion.div>
        ))}
      </div>
      {/* Carousel Text + Prgoress Bar */}
      <div
        className="flex-1
      mt-6 lg:mt-0
      lg:mx-10
      flex flex-col justify-center"
      >
        <div
          className="flex-1 flex flex-col justify-center
        mb-6 lg:mb-0"
        >
          {items.map(({ id, title, desc }, index) => (
            <motion.div
              key={`carousel-${id}`}
              initial={{ opacity: active === index ? 1 : 0 }}
              animate={{ opacity: active === index ? 1 : 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`object-contain ${
                active === index ? "" : "hidden"
              } flex items-center`}
            >
              <div
                className="w-full flex flex-col 
             justify-start md:justify-center 
            gap-2 lg:gap-4 
            lg:pt-0
            overflow-hidden"
              >
                <h2
                  className={`${sejongHospitalBold.className} text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl`}
                >
                  {title}
                </h2>
                <span
                  className={`${sejongHospitalLight.className} text-xs sm:text-sm md:text-base xl:text-base
                  h-16 sm:h-24 md:h-28 lg:h-fit
                  `}
                >
                  {desc}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="flex flex-row gap-3">
          {items.map(({ id, title, desc }, index) => (
            <button
              key={`carousel-${id}`}
              className="w-full"
              onClick={() => {
                setActive(index);
                setProgress(0);
              }}
            >
              <span
                className="block relative w-full hover:bg-opacity-50 bg-slate-200 h-[5px] rounded-full"
                role="progressbar"
                aria-valuenow={active === index ? progress : 0}
              >
                <span
                  className="absolute inset-0 bg-michigan-blue rounded-[inherit]"
                  style={{ width: active === index ? `${progress}%` : "0%" }}
                ></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
