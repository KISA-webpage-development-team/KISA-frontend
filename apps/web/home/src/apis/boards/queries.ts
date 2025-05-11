// GET API Axios calls
// starting with "/boards" endpoint

import client from "@/lib/axios/client";
import { BoardType } from "@/types/board";
import { SimplePost } from "@/types/post";

/**
 * @desc  Fetch board data
 * @route GET /boards/{boardType}/posts/?size={size}&page={page}
 */
export async function getBoardPosts(
  boardType: BoardType,
  size: 10 | 20 | 30,
  page: number
): Promise<SimplePost[] | undefined> {
  // NOTE: page is 0-indexed

  const url = `/boards/${boardType}/posts/?size=${size}&page=${page}`;
  try {
    const response = await client.get(url);

    return response?.data?.results;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/**
 * @desc Fetch the announcements in a board
 * @route GET /boards/{boardType}/announcements/
 */
export async function getBoardAnnouncements(
  boardType: BoardType
): Promise<SimplePost[] | undefined> {
  const url = `/boards/${boardType}/announcements/`;
  try {
    const response = await client.get(url);
    return response?.data?.results;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

// export async function getBoardAnnouncementsMock(
//   boardType: BoardType
// ): Promise<SimplePost[] | undefined> {
//   interface SimplePost {
//     postid: number;
//     title: string;
//     created: string;
//     type: BoardType;
//     fullname: string;
//     email: string; // FK - User.email
//     readCount: number;
//     commentsCount: number;
//   }

//   const announcements = [
//     {
//       postid: 500,
//       title: "tmv 1",
//       created: "2022-01-01T00:00:00",
//       type: BoardType.Sponsor,
//       fullname: "인지오",
//       email: "jiohin@umich.edu",
//       readCount: 100,
//       commentsCount: 10,
//       anonymous: false,
//     },
//     {
//       postid: 501,
//       title: "공지사항 2",
//       created: "2022-01-02T00:00:00",
//       type: BoardType.Sponsor,
//       fullname: "김동섭",
//       email: "dongsubk@umich.edu",
//       readCount: 150,
//       commentsCount: 15,
//       anonymous: false,
//     },
//   ];

//   return announcements;
// }

/**
 * @desc Fetch the number of posts in a board
 * @route GET /boards/{boardType}/count/
 */
export async function getBoardPostNum(
  boardType: BoardType
): Promise<number | undefined> {
  const url = `/boards/${boardType}/count/`;
  try {
    const response = await client.get(url);

    return response?.data?.postCount;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
