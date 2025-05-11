import React from "react";
import { UserBoardPost } from "@/types/post";
import { formatDateOrTime } from "@/utils/formats/date";
import { getKoreanBoardType } from "@/utils/formats/boardType";
import Link from "next/link";

type UserPostsTableProps = {
  posts: UserBoardPost[];
};

export default function UserPostsTable({ posts }: UserPostsTableProps) {
  const postsNum = posts.length;

  return (
    <table
      className="border border-gray-300 w-full
text-base text-black"
    >
      <caption className="hidden">게시판 목록</caption>

      <colgroup span={5}>
        <col width="60px" />
        <col width="*" />
        <col width="120px" />
        <col width="80px" />
        <col width="55px" />
      </colgroup>

      <thead className="w-full">
        <tr className="border-b border-gray-500 bg-gray-50/100">
          {/* 번호는 실질적인 col의 역할을 하지 않는다 */}
          <th className="pl-2 py-2 font-semibold text-gray-800">번호</th>
          <th className="py-2 font-semibold text-gray-800" scope="col">
            제목
          </th>
          <th className="py-2 font-semibold text-gray-800" scope="col">
            게시판
          </th>
          <th className="py-2 font-semibold text-gray-800" scope="col">
            작성일
          </th>
          <th className="pr-2 py-2 font-semibold text-gray-800" scope="col">
            조회
          </th>
        </tr>
      </thead>

      <tbody className="w-full">
        {posts.map(({ postid, title, type, created, readCount }, idx) => (
          <tr key={postid} className="border-b border-gray-300">
            <td className="pl-2 py-2 text-center">{postsNum - idx}</td>
            <td className="py-2">
              <div className="text-left">
                <Link className="text-overflow w-fit" href={`/posts/${postid}`}>
                  <span className="hover:underline">{title}</span>
                </Link>
              </div>
            </td>
            <td className="text-center py-2">{getKoreanBoardType(type)}</td>
            <td className="text-center py-2">{formatDateOrTime(created)}</td>
            <td className="text-center pr-2 py-2">{readCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
