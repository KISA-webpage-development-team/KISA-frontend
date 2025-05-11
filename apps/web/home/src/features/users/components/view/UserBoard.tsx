"use client";

import React from "react";

// hook
import useUserBoard from "../../hooks/useUserBoard";

// sub-ui components
import UserPostsTable from "./UserPostsTable";
import MobileUserPostsList from "./MobileUserPostsList";
import UserCommentsTable from "./UserCommentsTable";
import MobileUserCommentsList from "./MobileUserCommentsList";
import { ListIcon, CommentIcon } from "@/final_refactor_src/components/icon";
import { CustomToggleBar } from "@/final_refactor_src/components/toggle";

// types
import { UserSession } from "@/lib/next-auth/types";

type UserBoardProps = {
  email: string;
  session: UserSession | null;
};

export default function UserBoard({ email, session }: UserBoardProps) {
  const { activeView, setActiveView, posts, comments, isLoading, error } =
    useUserBoard(email, session.token);

  const userBoardViewList = [
    {
      view: "posts",
      text: "게시물",
      icon: <ListIcon />,
    },
    {
      view: "comments",
      text: "댓글",
      icon: <CommentIcon />,
    },
  ];

  // [Logic]: Do not render anything if loading or error occurred.
  if (isLoading || error) return <></>;

  return (
    <div className={`flex flex-col w-full`}>
      {/* 토글바: 게시물 / 댓글 */}
      <CustomToggleBar
        activeView={activeView}
        setActiveView={setActiveView}
        viewList={userBoardViewList}
      />

      {/* 게시물 목록 테이블 (pc: 테이블 | mobile: 리스트) */}
      {activeView === "posts" && (
        <>
          <div className="hidden md:block">
            <UserPostsTable posts={posts} />
          </div>
          <div className="block md:hidden">
            <MobileUserPostsList posts={posts} />
          </div>
        </>
      )}
      {activeView === "comments" && (
        <>
          <div className="hidden md:block">
            <UserCommentsTable comments={comments} />
          </div>
          <div className="block md:hidden">
            <MobileUserCommentsList comments={comments} />
          </div>
        </>
      )}
    </div>
  );
}
