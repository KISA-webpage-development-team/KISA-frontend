import React, { useCallback, useState } from "react";
import CommentItem from "./CommentItem";
import { UserSession } from "@/lib/next-auth/types";
import { Comment } from "@/types/comment";

type CommentsListProps = {
  isEveryKisa?: boolean;
  comments: Comment[];
  session: UserSession;
  setCommentsStale: (stale: boolean) => void;
  email: string;
};

// TODO: should I add "isEveryKisa"?
export default function CommentsList({
  isEveryKisa = false,
  comments,
  session,
  setCommentsStale,
  email,
}: CommentsListProps) {
  const commentAuthorMap = getCommentAuthorMap(comments, session?.user?.email);

  return (
    <ul className="flex flex-col gap-1 mt-2">
      {comments?.map((comment) => (
        <CommentItem
          isEveryKisa={isEveryKisa}
          key={`comment-${comment.commentid}`}
          session={session}
          comment={comment}
          parentCommentid={comment.commentid}
          setCommentsStale={setCommentsStale}
          postAuthorEmail={email}
          commentAuthorMap={commentAuthorMap}
        />
      ))}
    </ul>
  );
}

/**
 * Get comment author map using DFS
 */
function getCommentAuthorMap(
  comments: Comment[],
  sessionEmail: string
): Map<string, number> {
  const commentAuthorMap = new Map<string, number>();
  let idx = 1;

  const dfs = (comment: Comment) => {
    if (comment.email === sessionEmail) {
      commentAuthorMap.set(comment.email, 0);
    } else if (comment.anonymous && !commentAuthorMap.has(comment.email)) {
      commentAuthorMap.set(comment.email, idx++);
    }

    if (comment.childComments && comment.childComments.length > 0) {
      for (const childComment of comment.childComments) {
        dfs(childComment);
      }
    }
  };

  for (const comment of comments) {
    dfs(comment);
  }
  return commentAuthorMap;
}
