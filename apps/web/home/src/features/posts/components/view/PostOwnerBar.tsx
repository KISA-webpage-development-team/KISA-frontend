import React from "react";
import Link from "next/link";

// sub-ui components
import VerticalDivider from "@/final_refactor_src/components/divider/VerticalDivider";
import { ClockIcon } from "@/final_refactor_src/components/icon";

// utils
import { formatRelativeTime, formatDateTimeString } from "@/utils/formats/date";

type PostOwnerBarProps = {
  email: string;
  fullname: string;
  created: string;
  readCount: number;
  commentsCount: number;
};

export default function PostOwnerBar({
  email,
  fullname,
  created,
  readCount,
  commentsCount,
}: PostOwnerBarProps) {
  return (
    <div
      className="flex justify-between items-center 
    text-xs sm:text-sm "
    >
      {/* left: fullname + created */}
      <div className="flex items-center gap-2">
        {/* later, fullname will be linked to user profile */}
        <Link href={`/users/${email}`}>
          <p className="font-semibold hover:underline">{fullname}</p>
        </Link>

        <VerticalDivider size="small" />
        <div className="flex items-center gap-1">
          <ClockIcon />
          <p className="text-gray-600 hidden sm:block">
            {formatDateTimeString(created)}
          </p>
          <p className="text-gray-600 block sm:hidden">
            {formatRelativeTime(created)}
          </p>
        </div>
      </div>

      {/* right: readCount, (추천수, 댓글수) */}
      <div
        className="flex items-center 
      gap-2 text-gray-600"
      >
        <div className="flex items-center gap-1">
          <p>조회</p>
          <p className="text-black">{`${readCount}`}</p>
        </div>
        <VerticalDivider size="small" />
        <div className="flex items-center gap-1">
          <p>댓글</p>
          <p className="text-black">{`${commentsCount}`}</p>
        </div>
      </div>
    </div>
  );
}
