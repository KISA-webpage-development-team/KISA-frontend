import React from "react";
import Link from "next/link";
import AnnouncementIcon from "../ui/AnnouncementIcon";
import { SimplePost } from "@/types/post";
import { formatDateOrTime } from "@/utils/formats/date";

type Props = {
  isEveryKisa?: boolean;
  post: SimplePost;
  postNum?: number;
  isAnnouncement?: boolean;
};

export default function BoardTableRow({
  isEveryKisa = false,
  post,
  postNum = 0,
  isAnnouncement = false,
}: Props) {
  const {
    postid,
    type,
    title,
    fullname,
    created,
    readCount,
    commentsCount,
    anonymous,
    likesCount,
  } = post;
  // console.log("post: ", post);
  // console.log("likesCount", likesCount);

  return (
    <tr
      className={`${
        isAnnouncement && "bg-gray-100"
      } border-b border-gray-200 hover:bg-gray-100`}
    >
      {/* 번호 */}
      <td className="relative text-center py-2 pl-2">
        {isAnnouncement ? (
          <div className="flex items-center justify-center">
            <span className="absolute top-0 left-0 h-full w-1 bg-michigan-blue" />
            <AnnouncementIcon />
          </div>
        ) : (
          <span>{postNum}</span>
        )}
      </td>
      {/* 제목 */}
      <td className="py-2">
        <div className="text-left">
          <Link className="text-overflow w-fit" href={`/posts/${postid}`}>
            <span className="hover:underline">
              {title}
              {commentsCount > 0 && (
                <span className="ml-1 text-[#ED5555]">{`[${commentsCount}]`}</span>
              )}
            </span>
          </Link>
        </div>
      </td>
      {/* EveryKisa에는 글쓴이를 표시하지 않는다 */}
      {!isEveryKisa && (
        <td className="text-center py-2">{anonymous ? "" : fullname}</td>
      )}
      <td className="text-center py-2">{formatDateOrTime(created)}</td>
      {isEveryKisa && (
        <td className="text-center py-2 pr-2">{likesCount ? likesCount : 0}</td>
      )}
      <td className="text-center py-2 pr-2">{readCount}</td>
    </tr>
  );
}
