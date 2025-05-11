import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";
import Link from "next/link";
import HorizontalDivider from "../shared/HorizontalDivider";
import MobileBoardList from "../Boards/MobileBoardList";
import {
  getKoreanBoardType,
  isEveryKisaBoard,
} from "@/utils/formats/boardType";

export default function HomePostView({ type, posts }) {
  const boardLink = isEveryKisaBoard(type) ? "everykisa" : "boards";

  return (
    <div
      className="w-full flex flex-col
  rounded-lg  border-gray-300 border-1 
    p-4 gap-1"
    >
      <Link href={`/${boardLink}/${type}`}>
        <h2
          className={`${sejongHospitalBold.className} text-lg mb-0 hover:underline cursor-pointer`}
        >{`${getKoreanBoardType(type)}`}</h2>
      </Link>

      <HorizontalDivider color="gray" />

      <div className="flex flex-col md:flex-row">
        {/* table */}
        <MobileBoardList
          isEveryKisa={isEveryKisaBoard(type)}
          posts={posts.slice(0, 3)}
          announcements={null}
          hasBorder={false}
        />

        <MobileBoardList
          isEveryKisa={isEveryKisaBoard(type)}
          posts={posts.slice(3, 6)}
          announcements={null}
          hasBorder={false}
        />
      </div>
    </div>
  );
}
