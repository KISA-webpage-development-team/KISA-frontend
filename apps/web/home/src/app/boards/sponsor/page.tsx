import React from "react";
import BoardBar from "../../../components/Boards/BoardBar";
import BoardClient from "../../../components/Boards/BoardClient";
import { getBoardAnnouncements } from "@/apis/boards/queries";
import { BoardType } from "@/types/board";

type SponsorProps = {
  searchParams?: {
    size?: number;
    page?: number;
  };
};

export default async function SponsorPage({ searchParams }: SponsorProps) {
  const { size, page } = searchParams;

  const boardType = BoardType.Sponsor;
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
