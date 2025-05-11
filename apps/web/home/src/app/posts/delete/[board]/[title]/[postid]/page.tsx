// this page lets user to confirm deletion of a post
import React from "react";
import PostDeleteClient from "../../../../../../components/Posts/post-delete/PostDeleteClient";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/next-auth/authOptions";
import { BoardType } from "@/types/board";

type PageProps = {
  params: {
    board: BoardType;
    title: string;
    postid: string;
  };
};

export default async function DeleteConfirmPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const { board, title, postid } = params; // post title
  const krTitle = decodeURI(title); // decodeURI to decode the encoded title

  return (
    <section className="items-center justify-center gap-4">
      <h1>게시물을 삭제하시겠습니까?</h1>
      {/* Actual delete api call happens here */}
      <PostDeleteClient session={session} boardType={board} postid={postid} />
    </section>
  );
}
