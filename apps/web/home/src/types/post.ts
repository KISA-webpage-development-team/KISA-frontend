// Declare Types for Post Entity (not props!)

import { BoardType } from "./board";

interface SimplePost {
  postid: number;
  title: string;
  created: string;
  type: BoardType;
  fullname: string;
  email: string; // FK - User.email
  readCount: number;
  commentsCount: number;
  // for anonymous posts
  anonymous: boolean;
  // like
  likesCount: number;
}

interface Post extends SimplePost {
  text: string;
  isAnnouncement: boolean;
}

interface NewPostBody {
  type: BoardType;
  title: string;
  fullname: string;
  email: string;
  text: string;
  isAnnouncement: boolean;
  anonymous: boolean;
  readCount: number;
}

interface UpdatePostBody {
  type: BoardType;
  title: string;
  text: string;
  isAnnouncement: boolean;
}

// TODO: UserBoardPost -> SimplePost로 통일 (getBoardPosts와 동일한 리턴 타입을 가져야함)
interface UserBoardPost extends Omit<Post, "commentsCount"> {}

export type { Post, SimplePost, UserBoardPost, NewPostBody, UpdatePostBody };
