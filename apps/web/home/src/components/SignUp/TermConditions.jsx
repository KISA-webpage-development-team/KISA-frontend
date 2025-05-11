import React, { useEffect, useRef, useState } from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

export default function TermConditions({
  isScrolledToBottom,
  setIsScrolledToBottom,
  termChecked,
  setTermChecked,
  label,
  text,
  checkboxLabel,
}) {
  const divRef = useRef(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const div = divRef.current;
      if (div) {
        const { scrollTop, scrollHeight, clientHeight } = div;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight;
        if (isAtBottom || scrollTop > lastScrollTop) {
          setIsScrolledToBottom(isAtBottom);
          setLastScrollTop(scrollTop);
        }
      }
    };

    const div = divRef.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
      return () => div.removeEventListener("scroll", handleScroll);
    }
  }, [divRef, setIsScrolledToBottom, lastScrollTop]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className={`${sejongHospitalBold.className} text-base md:text-lg`}>
        {label}
        <span className="text-red-500 ml-2">*</span>
      </span>
      <div
        ref={divRef}
        className="border border-gray-300 rounded-lg p-3
      max-h-72 overflow-y-auto"
      >
        {text}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          disabled={!isScrolledToBottom}
          value={termChecked}
          onChange={(e) => setTermChecked(e.target.checked)}
        />
        <span
          className={` ${sejongHospitalLight.className} text-sm ${
            isScrolledToBottom ? "text-black" : "text-gray-400"
          }`}
        >
          {checkboxLabel}
        </span>
      </div>
    </div>
  );
}
