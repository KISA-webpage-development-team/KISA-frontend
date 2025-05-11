"use client";

// [UI]
// 1. comment count
// 2. default comment editor to add direct comment on the post
// 3. comment list

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCommentsByPostid } from "@/apis/comments/queries";

// sub-ui components
import CommentEditor from "./CommentEditor";
import CommentsList from "./CommentsList";

// types
import { Comment } from "@/types/comment";
import { UserSession } from "@/lib/next-auth/types";

type CommentsViewProps = {
  isEveryKisa?: boolean;
  commentsCount: number;
  postid: number;
  email: string;
};

export default function CommentsView({
  isEveryKisa = false,
  commentsCount,
  postid,
  email,
}: CommentsViewProps) {
  const { data: session, status } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsStale, setCommentsStale] = useState<boolean>(true); // keep comments up-to-date

  // fetch comments to keep comments up-to-date
  useEffect(() => {
    const getComments = async () => {
      const comments_res = await getCommentsByPostid(postid);
      // const comments_res = await getCommentsByPostidMock(postid);
      setComments(comments_res);
      setCommentsStale(false);
      return;
    };

    // trigger fetching comments whenever comment is added/updated/deleted by logged-in user
    if (commentsStale) getComments();
  }, [commentsStale, postid]);

  if (status === "loading") {
    return <></>;
  }

  return (
    <div className="flex flex-col py-4 gap-2 self-stretch">
      {/* 1. comment count */}
      {/* [TODO] post의 commentsCount를 상시 업데이트하지 못하고 있음. */}
      <p className="text-sm md:text-base">{`댓글 ${commentsCount}개`}</p>
      {/* 2. default comment editor to add direct comment on the post */}
      {status === "authenticated" && (
        <CommentEditor
          isEveryKisa={isEveryKisa}
          mode="create"
          session={session}
          postid={postid}
          setCommentsStale={setCommentsStale}
        />
      )}

      {/* 3. comment list */}
      <CommentsList
        isEveryKisa={isEveryKisa}
        comments={comments}
        session={session}
        setCommentsStale={setCommentsStale}
        email={email}
      />
      {/* <CommentsList commentsCount={commentsCount} comments={comments} /> */}
    </div>
  );
}
