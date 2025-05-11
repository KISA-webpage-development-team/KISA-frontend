import React from "react";
import BoardTitle from "../../../../components/Boards/BoardTitle";

import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/next-auth/authOptions";
import { BoardType } from "@/types/board";

// need to force EditorClient to be rendered on client-side
// I don't know why NextJS doesn't automatically render it on client-side
// this will remove the error "document is not defined"
const EditorClient = dynamic(
  () => import("../../../../components/Posts/post-edit/EditorClient"),
  {
    ssr: false,
  }
);

type PageProps = {
  params: {
    boardType: BoardType;
  };
};

export default async function CreatePostPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  const { boardType } = params;

  return (
    <section>
      {/* Board Title (지금 어떤 보드에 대한 게시물을 쓰는지 확인위해) */}
      <BoardTitle boardType={boardType} />

      {/* Text Editor */}
      <div className="grow w-full">
        <EditorClient session={session} boardType={boardType} mode="create" />
      </div>
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// Client-Side Components like BoardTitle and EditorClient are rendered and
// become interactive in the browser after the initial HTML is loaded
