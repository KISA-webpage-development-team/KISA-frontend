import React from "react";
import Link from "next/link";
import { formatDateOrTime, formatRelativeTime } from "@/utils/formats/date";
import { UserBoardPost } from "@/types/post";
import { getKoreanBoardType } from "@/utils/formats/boardType";

type MobileUserPostsListProps = {
  posts: UserBoardPost[];
};

export default function MobileUserPostsList({
  posts,
}: MobileUserPostsListProps) {
  return (
    <div
      className="sm:w-full sm:translate-x-0
        w-screen -translate-x-4
        border-t border-b border-gray-400"
    >
      <div
        className="flex items-center
        px-4 py-2
      border-b border-gray-400 bg-gray-50/100"
      >
        <div
          className="flex-1 flex
        text-sm font-semibold justify-center"
        >
          <span>제목</span>
        </div>
        <div className="text-sm font-semibold text-center">작성일</div>
      </div>
      <ol>
        {posts?.map(
          ({ postid, type, title, fullname, readCount, created }, idx) => (
            <li
              key={postid}
              className={`flex items-center justify-between
              border-b border-gray-200 py-2 px-4`}
            >
              <div className="flex flex-col items-start justify-center">
                <div className="text-[15px] flex items-center">
                  <Link className="w-fit" href={`/posts/${postid}`}>
                    <span
                      className={`text-overflow hover:underline flex flex-row`}
                    >
                      <span className="">{title}</span>
                    </span>
                  </Link>
                </div>
                <div
                  className=" flex items-center gap-2 
                text-gray-500 text-xs"
                >
                  <span>{getKoreanBoardType(type)}</span>
                  <span>{fullname}</span>
                  <span>{`조회 ${readCount}`}</span>
                </div>
              </div>

              <div className="text-black text-sm">
                {formatRelativeTime(created)}
              </div>
            </li>
          )
        )}
      </ol>
    </div>
  );
}
