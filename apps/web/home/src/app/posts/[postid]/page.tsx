"use client";

// [UI]
// BoardTitle
// PostView
// CommentsView

// [Rendering Method]: CSR (Client Side Rendering) with SWR
import BoardTitle from "../../../components/Boards/BoardTitle";
import CommentsView from "../../../components/Posts/comment/CommentsView";
import PostView from "../../../components/Posts/post-view/PostView";
import { SessionProvider } from "next-auth/react";
import {
  LoadingSpinner,
  NotFound,
} from "@/final_refactor_src/components/feedback";
import { usePost } from "@/apis/posts/swrHooks";
import {
  isAnnouncementBoard,
  isEveryKisaBoard,
} from "@/utils/formats/boardType";
import { useEffect, useState } from "react";
import { getPost } from "@/apis/posts/queries";

type PageProps = {
  params: {
    postid: string;
  };
};

export default function PostViewPage({ params }: PageProps) {
  const { postid } = params;
  // const [post, setPost] = useState();

  const { post, isLoading, error } = usePost(Number(postid));

  // [TODO] temporarily sets studyGroupPost as whether post title starts with 스터디 그룹 모집
  // later, this needs to be changed by integrating backend with new column
  const studyGroupPost =
    post?.postid === 368 || post?.title.startsWith("스터디 그룹 모집");

  const canComment = !post?.isAnnouncement && !isAnnouncementBoard(post?.type);

  // useEffect(() => {
  //   const fetchPost = async () => {

  //     try {
  //     const response = await getPost(Number(postid));

  //     }
  //       catch(error) {
  //       console.error("Error fetching post: ", error);
  //       }
  //   }
  // }, [])

  // [TODO]: when there's no post "error.tsx" should be rendered
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <NotFound />;
  }

  return (
    <section className="!gap-0">
      <BoardTitle boardType={post.type} size="small" />

      <SessionProvider>
        {/* 일단 post가 로딩되면 먼저 보여준다. */}
        <PostView post={post} />

        {/* Comments는 로딩되는대로 */}
        {/* if study group or  canComment */}
        {studyGroupPost || canComment ? (
          // bit worry about props drilling on post.type to handle every kisa
          <CommentsView
            isEveryKisa={isEveryKisaBoard(post?.type)}
            commentsCount={post?.commentsCount}
            postid={post?.postid}
            email={post?.email}
          />
        ) : null}
      </SessionProvider>
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// "post" is initially fetched from the server
// and then the page is rendered with the fetched data.
