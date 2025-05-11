import { Comment } from "@/types/comment";
import { formatDateOrTime } from "@/utils/formats/date";
import Link from "next/link";
import React from "react";

type UserCommentsTableProps = {
  comments: Comment[];
};

export default function UserCommentsTable({
  comments,
}: UserCommentsTableProps) {
  const commentsNum = comments.length;

  return (
    <table
      className="border border-gray-300 w-full
    text-base text-black"
    >
      <caption className="hidden">게시판 목록</caption>

      <colgroup span={3}>
        <col width="60px" />
        <col width="*" />
        <col width="90px" />
      </colgroup>

      <thead className="w-full">
        <tr className="border-b border-gray-500 bg-gray-50/100">
          <th className="pl-2 py-2 font-semibold text-gray-800">번호</th>
          <th className="py-2 font-semibold text-gray-800" scope="col">
            내용
          </th>
          <th className="py-2 font-semibold text-gray-800" scope="col">
            작성일
          </th>
        </tr>
      </thead>

      <tbody className="w-full">
        {comments.map(({ commentid, text, created, postid }, idx) => (
          <tr key={commentid} className="border-b border-gray-300">
            <td className="pl-2 py-2 text-center">{commentsNum - idx}</td>
            <td className="py-2">
              <div className="text-left">
                <Link className="text-overflow w-fit" href={`/posts/${postid}`}>
                  <span className="hover:underline">{text}</span>
                </Link>
              </div>
            </td>
            <td className="text-center py-2">{formatDateOrTime(created)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
