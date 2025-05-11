// boardId = url에서 /boards/{boardId}
import Link from "next/link";
import React from "react";
import { BoardType } from "@/types/board";
import { getKoreanBoardType } from "@/utils/formats/boardType";

type PostBoardTitleProps = {
  boardType: BoardType;
};

export default function PostBoardTitle({ boardType }: PostBoardTitleProps) {
  const boardLink = `/boards/${boardType}`;

  return (
    <Link href={boardLink} className="w-max self-stretch">
      <p
        className={`cursor-pointer hover:underline
        text-xs sm:text-sm font-semibold text-michigan-blue`}
      >
        {`${getKoreanBoardType(boardType)} >`}
      </p>
    </Link>
  );
}
