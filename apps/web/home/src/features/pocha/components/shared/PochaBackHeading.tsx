import PochaBackIcon from "@/final_refactor_src/components/icon/PochaBackIcon";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { useRouter } from "next/navigation";
import React from "react";

interface PochaBackHeadingProps {
  title: string;
}

export default function PochaBackHeading({ title }: PochaBackHeadingProps) {
  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  return (
    <div className="flex items-center relative py-3">
      <button className="absolute left-3" onClick={handleBackButton}>
        <PochaBackIcon size="large" />
      </button>
      <h1
        className={`w-full
            ${sejongHospitalBold.className} text-xl text-center text-michigan-blue`}
      >
        {title}
      </h1>
    </div>
  );
}
