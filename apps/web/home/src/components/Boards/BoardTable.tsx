// [2024.06.18 ~] Testing on semantic html on board table

import React from "react";
import BoardTableRow from "./BoardTableRow";
import "../../app/boards/board.css";
import { SimplePost } from "@/types/post";

// for now, just use any type
type BoardTableProps = {
  isEveryKisa?: boolean;
  postStartIdx: number;
  posts: SimplePost[];
  announcements: SimplePost[];
};

// [NOTE]
// 왜 board.css의 스타일이 table에 빌드 때 적용되지 않느냐?
// 시발!

export default function BoardTable({
  isEveryKisa = false,
  postStartIdx,
  posts,
  announcements,
}: BoardTableProps) {
  // 추천은 isEveryKisa일 때만 표시한다

  return (
    <table
      className="border border-gray-300 w-full
  text-base text-black"
    >
      <caption className="hidden">게시판 목록</caption>

      <colgroup span={5}>
        <col width="60px" />
        <col width="*" />
        {/* EveryKisa에는 글쓴이를 표시하지 않는다 */}
        {!isEveryKisa && <col width="80px" />}
        <col width="80px" />
        {isEveryKisa && <col width="50px" />}
        <col width="50px" />
      </colgroup>

      <thead className="w-full">
        <tr className="border-b border-gray-500">
          {/* 번호는 실질적인 col의 역할을 하지 않는다 */}
          <th className="pl-2 py-2 font-semibold text-gray-800">번호</th>
          <th className="py-2 font-semibold text-gray-800" scope="col">
            제목
          </th>
          {/* EveryKisa에는 글쓴이를 표시하지 않는다 */}
          {!isEveryKisa && (
            <th className="py-2 font-semibold text-gray-800" scope="col">
              글쓴이
            </th>
          )}

          <th className="py-2 font-semibold text-gray-800" scope="col">
            작성일
          </th>
          {isEveryKisa && (
            <th className="pr-2 py-2 font-semibold text-gray-800" scope="col">
              추천
            </th>
          )}
          <th className="pr-2 py-2 font-semibold text-gray-800" scope="col">
            조회
          </th>
        </tr>
      </thead>

      <tbody className="w-full">
        {announcements?.map((announcement, _) => (
          <BoardTableRow
            isEveryKisa={isEveryKisa}
            key={announcement.postid}
            post={announcement}
            isAnnouncement
          />
        ))}
        {posts?.map((post, idx) => (
          <BoardTableRow
            isEveryKisa={isEveryKisa}
            key={post.postid}
            post={post}
            postNum={postStartIdx - idx}
          />
        ))}
      </tbody>
    </table>
  );
}
