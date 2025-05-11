import React from "react";

type PostTitleBarProps = {
  isAnnouncement: boolean;
  title: string;
};

export default function PostTitleBar({
  isAnnouncement,
  title,
}: PostTitleBarProps) {
  return (
    <div
      className="flex justify-start font-medium text-black
    text-lg sm:text-xl md:text-2xl"
    >
      <span>
        {isAnnouncement ? (
          <span className="text-blue-700 font-bold">{`[공지] `}</span>
        ) : (
          <></>
        )}
        {title}
      </span>
    </div>
  );
}
