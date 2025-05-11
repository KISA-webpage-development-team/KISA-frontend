import React from "react";
import { getBoardAnnouncements } from "@/apis/boards/queries";

// sub-ui components
import BoardBar from "../../../components/Boards/BoardBar";
import BoardClient from "../../../components/Boards/BoardClient";
import { BoardType } from "@/types/board";

type ConcernPageProps = {
  searchParams?: {
    size?: number;
    page?: number;
  };
};

export default async function ConcernPage({ searchParams }: ConcernPageProps) {
  const { size, page } = searchParams;

  const boardType = BoardType.Concern;
  // 공지사항은 Server Side이기 때문에 완전한 실시간 데이터가 아니다.
  // 공지사항 게시글의 특성상 실시간으로 완전한 싱크 (지속적인 api call)이 필요하지 않다.
  const announcements = await getBoardAnnouncements(boardType);

  return (
    <section>
      {/* 게시판 search bar */}
      <header className="w-full">
        <BoardBar boardType={boardType} />
      </header>
      {/* 게시판 table */}
      {/* API happens in BoardTable client component */}
      <article className="board_table_wrapper">
        <BoardClient
          boardType={boardType}
          announcements={announcements}
          size={size ? Number(size) : 10}
          page={page ? Number(page) : 1}
        />
      </article>
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// "announcementPosts" are fetched from the server
// (공지사항은 자주 바뀌지 않는다 + 일반 유저의 인터렉션이 존재하지 않는다)
// "posts" are fetched from the client side using useSWR hooks
// and then the page is rendered with the fetched data.
// BoardBar is a client component that interacts with user
