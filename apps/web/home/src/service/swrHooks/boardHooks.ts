"use client";

import useSWR, { SWRConfiguration } from "swr";
import { BoardType } from "@/types/board";
import { SimplePost } from "@/types/post";

// GET
// data type -------------------------------------
type BoardPostsData = SimplePost[] | null;
// -----------------------------------------------
// @route GET /boards/{boardType}/posts/?size={size}&page={page}
// @params boardType, size, page
export function useBoardPosts(
  boardType: BoardType,
  size: number,
  page: number,
  options?: SWRConfiguration
) {
  const { data, error, isLoading } = useSWR(
    boardType ? `/boards/${boardType}/posts/?size=${size}&page=${page}` : null,
    options
  );

  return {
    posts: data?.results as BoardPostsData,
    isLoading,
    isError: error,
  };
}

// @route GET /boards/{boardType}/count/
// @params boardType.
export function useBoardPostNum(
  boardType: BoardType,
  options?: SWRConfiguration
) {
  const { data, error, isLoading } = useSWR(
    boardType ? `/boards/${boardType}/count/` : null,
    options
  );

  return {
    postNum: data?.postCount as number | null,
    isLoading,
    isError: error,
  };
}
