// Declare Types for Post Entity (not props!)

interface NewCommentBody {
  email: string;
  fullname: string;
  text: string;
  isCommentOfComment: boolean;
  parentCommentid: number | null;
  anonymous: boolean;
  secret: boolean;
}

interface UpdateCommentBody {
  // when updating a comment, user can't change anonymous status
  text: string;
}

interface Comment extends NewCommentBody {
  commentid: number;
  postid: number;
  created: string;
  childComments: Comment[];
  likesCount: number;
}

export type { Comment, NewCommentBody, UpdateCommentBody };
