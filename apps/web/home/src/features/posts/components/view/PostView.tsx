// [UI]
// 1. Post Title Bar: title + isAnnouncement
// 2. Post Owner Bar: fullname + created + readCount + commentsCount
// 3. Post Content: text
// 4. Edit + Delete + List Buttons

import React, { useEffect, useState } from "react";

// sub-ui components
import PostTitleBar from "./PostTitleBar";
import PostOwnerBar from "./PostOwnerBar";
import PostContent from "./PostContent";
import PostButtonBar from "./PostButtonBar";

// TODO: final_refactor_src -> @components
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import { HorizontalDivider } from "@/final_refactor_src/components/divider";

// Libs
import ReactCookieProvider from "@/lib/react-cookie/provider";
import { getCookie, setCookie } from "@/lib/react-cookie/cookie";
import { useSession } from "next-auth/react";

// APIs
import { incrementReadCount } from "@/apis/posts/mutations";

// types
import { UserSession } from "@/lib/next-auth/types";
import { Post } from "@/types/post";

type PostViewProps = {
  post: Post;
};

export default function PostView({ post }: PostViewProps) {
  const { data: session, status } = useSession() as {
    data: UserSession | null;
    status: string;
  };

  const {
    postid,
    type,
    title,
    text,
    isAnnouncement,
    email,
    fullname,
    created,
    readCount,
    commentsCount,
  } = post;

  const [didRead, setDidRead] = useState(false);

  // read count
  // : when cookie doesn't exist, create one and increase read count (`incrementReadCount`)
  // if cookie exists, don't increase read count, but update the cookie expiration time
  useEffect(() => {
    const postReadCount = async () => {
      try {
        const res = await incrementReadCount(postid);
        if (res === null) {
          console.log("Failed to increment read count");
        }
      } catch (error) {
        console.error("Error incrementing read count: ", error);
      }
    };

    const cookieHandler = async () => {
      const cookieName = `read-${postid}`;
      if (getCookie(cookieName) === undefined) {
        // 만약 쿠키가 없다
        // -> 쿠키를 생성 + 조회수 증가
        setCookie(cookieName, true, {
          path: "/",
          secure: true,
          maxAge: 60 * 60 * 24, // 1 day
        });
        setDidRead(true);

        await postReadCount();
        return;
      } else {
        setCookie(cookieName, true, {
          path: "/",
          secure: true,
          maxAge: 60 * 60 * 24, // 1 day
        });
      }
    };

    cookieHandler();
  }, [postid]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <ReactCookieProvider>
      <div className="w-full flex flex-col self-stretch">
        <div
          className="w-full flex flex-col 
        pt-1 pb-2 gap-1 bg-yellow-400"

          // style={{
          //   paddingBottom: 8,
          // }}
        >
          {/* 1. Post Title Bar */}
          <PostTitleBar isAnnouncement={isAnnouncement} title={title} />
          {/* 2. Post Owner Bar */}
          <PostOwnerBar
            email={email}
            fullname={fullname}
            created={created}
            readCount={didRead ? Number(readCount) + 1 : readCount}
            commentsCount={commentsCount}
          />
        </div>

        <HorizontalDivider color="gray" />

        {/* 3. Post Content */}
        <PostContent text={text} />

        {/* 4. Post Buttons: Edit + Delete + List Buttons */}
        <PostButtonBar
          isAuthor={session?.user.email === email}
          type={type}
          postid={postid}
          title={title}
        />

        <HorizontalDivider />
      </div>
    </ReactCookieProvider>
  );
}
