// GET API Axios calls
// starting with "/comments" endpoint

import client from "@/lib/axios/client";
import { Comment } from "@/types/comment";

// something will be added here...

// need email from the response
export async function getCommentsByPostid(
  postid: number
): Promise<Comment[] | undefined> {
  const url = `/comments/${postid}/`;
  try {
    const response = await client.get(url);
    return response?.data;
  } catch (error) {
    //console.error(error);
    return undefined;
  }
}

// export async function getCommentsByPostidMock(
//   postid: number
// ): Promise<Comment[] | undefined> {
//   // Mock data for comments
//   const mockComments: Comment[] = [
//     {
//       commentid: 1,
//       postid: postid,
//       email: "jiohin@umich.edu",
//       fullname: "인지오",
//       text: "이용 방법이 안 올라왔는데요",
//       isCommentOfComment: false,
//       parentCommentid: null,
//       created: "2023-06-01T10:00:00Z",
//       anonymous: true,
//       childComments: [
//         {
//           commentid: 2,
//           postid: postid,
//           email: "dongsubk@umich.edu",
//           fullname: "김동섭",
//           text: "착한 사람 눈에만 보입니다",
//           isCommentOfComment: true,
//           parentCommentid: 1,
//           created: "2023-06-01T10:30:00Z",
//           anonymous: false,
//           childComments: [],
//         },
//       ],
//     },
//     {
//       commentid: 3,
//       postid: postid,
//       email: "ianpark@umich.edu",
//       fullname: "박이안",
//       text: "개노잼 글이네요",
//       isCommentOfComment: false,
//       parentCommentid: null,
//       created: "2023-06-01T11:00:00Z",
//       anonymous: true,
//       childComments: [
//         {
//           commentid: 4,
//           postid: postid,
//           email: "kinn@umich.edu",
//           fullname: "인경민",
//           text: "예의 좀 지키시죠",
//           isCommentOfComment: true,
//           parentCommentid: 3,
//           created: "2023-06-01T11:15:00Z",
//           anonymous: true,
//           childComments: [
//             {
//               commentid: 5,
//               postid: postid,
//               email: "ianpark@umich.edu",
//               fullname: "박이안",
//               text: "정숙해주세요",
//               isCommentOfComment: true,
//               parentCommentid: 4,
//               created: "2023-06-01T11:30:00Z",
//               anonymous: false,
//               childComments: [],
//             },
//             {
//               commentid: 6,
//               postid: postid,
//               email: "hyunwooj@umich.edu",
//               fullname: "정현우",
//               text: "...?",
//               isCommentOfComment: true,
//               parentCommentid: 4,
//               created: "2023-06-01T11:30:00Z",
//               anonymous: false,
//               childComments: [
//                 {
//                   commentid: 7,
//                   postid: postid,
//                   email: "ianpark@umich.edu",
//                   fullname: "박이안",
//                   text: "ㅋㅋ",
//                   isCommentOfComment: true,
//                   parentCommentid: 6,
//                   created: "2023-06-01T11:30:00Z",
//                   anonymous: true,
//                   childComments: [],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       commentid: 9,
//       postid: postid,
//       email: "sshins@umich.edu",
//       fullname: "신승민",
//       text: "전 이렇게 생각하지 않습니다",
//       isCommentOfComment: false,
//       parentCommentid: null,
//       created: "2023-06-01T15:00:00Z",
//       anonymous: false,
//       childComments: [
//         {
//           commentid: 10,
//           postid: postid,
//           email: "hyunwooj@umich.edu",
//           fullname: "정현우",
//           text: "숙지해달라고 ㅋㅋ",
//           isCommentOfComment: true,
//           parentCommentid: 3,
//           created: "2023-06-01T11:30:00Z",
//           anonymous: true,
//           childComments: [],
//         },
//       ],
//     },
//   ];

//   return mockComments;
// }
