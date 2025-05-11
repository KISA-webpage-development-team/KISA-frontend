import { Comment } from "@/types/comment";
import { formatRelativeTime } from "@/utils/formats/date";
import Link from "next/link";
import React from "react";

type MobileUserCommentsListProps = {
  comments: Comment[];
};

export default function MobileUserCommentsList({
  comments,
}: MobileUserCommentsListProps) {
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
        {comments?.map(({ commentid, postid, text, created }, idx) => (
          <li
            key={commentid}
            className={`flex items-center justify-between
            border-b border-gray-200 py-2 px-4`}
          >
            <div className="text-[15px] flex items-center">
              <Link className="w-fit" href={`/posts/${postid}`}>
                <span className={`text-overflow hover:underline flex flex-row`}>
                  <span className="">{text}</span>
                </span>
              </Link>
            </div>

            <div className="text-black text-sm">
              {formatRelativeTime(created)}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
