"use client";

import React, { useEffect } from "react";
import { heebo } from "../../utils/fonts/textFonts";

import { useBoardPostNum, useBoardPosts } from "@/apis/boards/swrHooks";

// types
import { BoardType } from "@/types/board";
import { SimplePost } from "@/types/post";

// sub-ui components
import BoardTable from "./BoardTable";
import MobileBoardList from "./MobileBoardList";
import PaginationSizeSelector from "./PaginationSizeSelector";
import { isEveryKisaBoard } from "@/utils/formats/boardType";

// [NOTE] page is still 1-indexing here
type Props = {
  boardType: BoardType;
  announcements: SimplePost[];
  size: number;
  page: number;
};

export default function BoardClient({
  boardType,
  announcements,
  size,
  page,
}: Props) {
  const isEveryKisa = isEveryKisaBoard(boardType);

  // Data Fetching from client side using custom useSWR hooks ----------------
  const {
    posts,
    isLoading: isPostsFetching,
    error: postsError,
  } = useBoardPosts(boardType, size, page - 1);
  // const {
  //   posts,
  //   isLoading: isPostsFetching,
  //   error: postsError,
  // } = useBoardPostsMock(boardType, size, page - 1);
  const {
    postNum: totalPostNum,
    isLoading: isPostNumFetching,
    error: postNumError,
  } = useBoardPostNum(boardType);

  // -----------------------------------------------

  if (isPostsFetching || isPostNumFetching) {
    return <></>;
  }
  //   postsError.response.status === 404
  if (postsError || postNumError) {
    return <div>게시글을 불러오는데 실패했습니다</div>;
  }

  return (
    <div
      className={`
    flex flex-col gap-4 ${heebo.className}`}
    >
      {/* TABLE */}
      <div className="hidden md:block">
        <BoardTable
          isEveryKisa={isEveryKisa}
          postStartIdx={totalPostNum - size * (page - 1)}
          posts={posts}
          announcements={page === 1 ? announcements : null}
        />
      </div>
      <div className="block md:hidden">
        <MobileBoardList
          isEveryKisa={isEveryKisa}
          posts={posts}
          announcements={page === 1 ? announcements : null}
        />
      </div>

      {/* PAGINATION BAR */}

      <PaginationSizeSelector
        totalPageNum={
          Math.ceil(totalPostNum / size) === 0
            ? 1
            : Math.ceil(totalPostNum / size)
        }
        pageNum={page}
        totalPostNum={totalPostNum}
        pageSize={size}
      />
    </div>
  );
}
