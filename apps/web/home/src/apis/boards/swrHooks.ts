"use client";
// SWR hooks for GET API calls
// starting with "/boards" endpoint

import useSWR, { SWRConfiguration } from "swr";
import { immutableOption } from "@/lib/swr/options";
import { BoardType } from "@/types/board";
import { SimplePost } from "@/types/post";
import { CustomAxiosError } from "@/lib/axios/types";

/**
 * @desc  Fetch board data
 * @route GET /boards/{boardType}/posts/?size={size}&page={page}
 */
export function useBoardPosts(
  boardType: BoardType,
  size: number,
  page: number,
  options: SWRConfiguration = immutableOption
): {
  posts: SimplePost[] | undefined;
  isLoading: boolean;
  error: CustomAxiosError | undefined;
} {
  // - By adding immutableOption,
  // revalidation is disabled for board data that doesn't change frequently,
  // except when the page is refreshed.
  // - token is NOT required for the request

  const url = `/boards/${boardType}/posts/?size=${size}&page=${page}`;

  const { data, error, isLoading } = useSWR(url, options);

  return {
    posts: data?.results,
    isLoading,
    error: error,
  };
}

// export function useBoardPostsMock(
//   boardType: BoardType,
//   size: number,
//   page: number,
//   options: SWRConfiguration = immutableOption
// ): {
//   posts: SimplePost[] | undefined;
//   isLoading: boolean;
//   error: CustomAxiosError | undefined;
// } {
//   const posts = [
//     {
//       postid: 502,
//       title: "똥글",
//       created: "2022-01-01T00:00:00",
//       type: BoardType.Community,
//       fullname: "인지오",
//       email: "jiohin@umich.edu",
//       readCount: 100,
//       commentsCount: 10,
//       anonymous: false,
//     },
//     {
//       postid: 503,
//       title: "또 다른 똥글",
//       created: "2022-01-02T00:00:00",
//       type: BoardType.Community,
//       fullname: "김동섭",
//       email: "dongsubk@umich.edu",
//       readCount: 150,
//       commentsCount: 15,
//       anonymous: false,
//     },
//     {
//       postid: 504,
//       title: "새로운 이벤트 안내",
//       created: "2022-01-03T10:30:00",
//       type: BoardType.Community,
//       fullname: "박서연",
//       email: "seoyeonp@umich.edu",
//       readCount: 200,
//       commentsCount: 25,
//       anonymous: true,
//     },
//     {
//       postid: 505,
//       title: "동아리 모집 공고",
//       created: "2022-01-04T14:45:00",
//       type: BoardType.Community,
//       fullname: "이민준",
//       email: "minjunl@umich.edu",
//       readCount: 180,
//       commentsCount: 30,
//       anonymous: false,
//     },
//     {
//       postid: 506,
//       title: "학사일정 변경 안내",
//       created: "2022-01-05T09:15:00",
//       type: BoardType.Community,
//       fullname: "최지원",
//       email: "jiwonc@umich.edu",
//       readCount: 250,
//       commentsCount: 20,
//       anonymous: false,
//     },
//     {
//       postid: 507,
//       title: "캠퍼스 시설 이용 안내",
//       created: "2022-01-06T11:00:00",
//       type: BoardType.Community,
//       fullname: "정현우",
//       email: "hyunwooj@umich.edu",
//       readCount: 120,
//       commentsCount: 8,
//       anonymous: true,
//     },
//     {
//       postid: 508,
//       title: "온라인 강의 안내",
//       created: "2022-01-07T16:20:00",
//       type: BoardType.Community,
//       fullname: "김서영",
//       email: "seoyoungk@umich.edu",
//       readCount: 300,
//       commentsCount: 40,
//       anonymous: true,
//     },
//     {
//       postid: 509,
//       title: "학생회 임원 선거 공고",
//       created: "2022-01-08T13:30:00",
//       type: BoardType.Community,
//       fullname: "장민석",
//       email: "minseokj@umich.edu",
//       readCount: 220,
//       commentsCount: 35,
//       anonymous: false,
//     },
//   ];

//   return {
//     posts: posts,
//     isLoading: false,
//     error: undefined,
//   };
// }

/**
 * @desc Fetch the number of posts in a board
 * @route GET /boards/{boardType}/count/
 */
export function useBoardPostNum(
  boardType: BoardType,
  options: SWRConfiguration = immutableOption
): {
  postNum: number | undefined;
  isLoading: boolean;
  error: CustomAxiosError | undefined;
} {
  // - By adding immutableOption,
  // revalidation is disabled for board data that doesn't change frequently,
  // except when the page is refreshed.
  // - token is NOT required for the request

  const url = `/boards/${boardType}/count/`;

  const { data, error, isLoading } = useSWR(url, options);

  return {
    postNum: data?.postCount,
    isLoading,
    error: error,
  };
}
