import React from "react";
import VerticalDivider from "../../shared/VerticalDivider";
import ClockIcon from "../../ui/ClockIcon";
import Link from "next/link";
import { formatDateTimeString, formatRelativeTime } from "@/utils/formats/date";

type PostOwnerBarProps = {
  isPostAuthor?: boolean;
  email: string;
  fullname: string;
  created: string;
  readCount: number;
  commentsCount: number;
  anonymous: boolean;
};

export default function PostOwnerBar({
  isPostAuthor = false,
  email,
  fullname,
  created,
  readCount,
  commentsCount,
  anonymous,
}: PostOwnerBarProps) {
  return (
    <div
      className="flex justify-between items-center 
    text-xs sm:text-sm"
    >
      {/* left: fullname + created */}
      <div className="flex items-center gap-2 font-semibold">
        {/* later, fullname will be linked to user profile */}
        {anonymous ? (
          isPostAuthor ? (
            <p className="">{`${fullname} (익명)`}</p>
          ) : (
            <p className="">익명</p>
          )
        ) : (
          <Link href={`/users/${email}`}>
            <p className=" hover:underline">{fullname}</p>
          </Link>
        )}

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
