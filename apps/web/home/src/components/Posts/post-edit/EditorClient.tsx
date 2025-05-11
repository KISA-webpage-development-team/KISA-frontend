"use client";

// EditorClient.tsx
// : wrapper of the Text Editor components for "creating" and "updating" posts

// [UI]
// - title input
// - text editor (reactquill)
// - checkboxes (admin) | submit button

import React, { useEffect, useState } from "react";

// sub-ui components
import TitleInput from "./TitleInput";
import TextEditor from "./TextEditor";
import CheckBoxes from "./CheckBoxes";
import PostSubmitButton from "./PostSubmitButton";

import {
  getEnglishBoardType,
  getKoreanBoardType,
} from "@/utils/formats/boardType";
import { getIsAdmin } from "@/apis/auth/queries";
import { getPost } from "@/apis/posts/queries";
import {
  isAnnouncementBoard,
  isEveryKisaBoard,
} from "@/utils/formats/boardType";
import { Radio, RadioGroup } from "@nextui-org/react";
import { cn } from "@/utils/styles/cn";
import {
  LoadingSpinner,
  NotAuthorized,
} from "@/final_refactor_src/components/feedback";

export default function EditorClient({
  session,
  boardType,
  curPostId = null,
  mode,
}) {
  const isEveryKisa = isEveryKisaBoard(boardType);

  // admin state
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // check admin status
  useEffect(() => {
    const fetchIsAdmin = async () => {
      const res = await getIsAdmin(session?.user.email, session?.token);
      if (res) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    if (session) {
      fetchIsAdmin();
    }
  }, [session]);

  // form states
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isAnnouncement, setIsAnnouncement] = useState<boolean>(false);

  // anonymous checkbox state for every kisa board ("anonymous" | "non-anonymous" | "none")
  const [anonymousValue, setAnonymousValue] = useState<string>("none");

  // fetch initial post if necessary
  useEffect(() => {
    const fetchInitialPost = async (postid) => {
      try {
        const res = await getPost(postid);
        // initialize post states
        setTitle(res.title);
        setText(res.text);
        setIsAnnouncement(res.isAnnouncement);

        console.log("res: ", res);
      } catch (error) {
        console.log("Error occured while fetching post: ", error);
      }
    };

    if (curPostId) {
      fetchInitialPost(curPostId);
    }
  }, [curPostId]);

  // submit button state
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState<boolean>(true);

  // submit button validation -------------------------------------------------
  useEffect(() => {
    if (isEveryKisa && mode === "create" && anonymousValue === "none") {
      setIsSubmitBtnDisabled(true);
      return;
    }

    if (title?.length === 0) {
      setIsSubmitBtnDisabled(true);
      return;
    }
    if (text?.length === 0 || text === "<p><br></p>") {
      setIsSubmitBtnDisabled(true);
      return;
    }

    setIsSubmitBtnDisabled(false);
  }, [title, text, boardType, anonymousValue, isEveryKisa, mode]);

  useEffect(() => {
    if (text === "") setIsSubmitBtnDisabled(true);
  }, [text]);

  // ---------------------------------------------------------------------------

  // Exception Handling -------------------------------------------------------
  // no need to handle not logged in because middleware will handle it
  // 1) admin status is not fetched yet
  if (isAdmin === null) {
    return <LoadingSpinner />;
  }
  // 2) if boardType is announcement and user is not admin
  if (isAnnouncementBoard(boardType) && isAdmin === false) {
    return <NotAuthorized />;
  }

  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col h-full gap-4">
      <TitleInput title={title} setTitle={setTitle} />
      {isAdmin !== null && (
        <TextEditor token={session?.token} text={text} setText={setText} />
      )}

      <div
        className={`flex
      ${isAdmin ? "w-full justify-between" : "justify-end"}
      mt-20 md:mt-12`}
      >
        {/* 공지사항 게시판 전용 태그
          TODO: DELETE THIS
        */}
        <div
          className="flex flex-row items-center 
        gap-4 sm:gap-8"
        >
          {isAdmin && (
            <CheckBoxes
              isBoardAnnouncement={isAnnouncementBoard(boardType)}
              isAnnouncement={isAnnouncement}
              setIsAnnouncement={setIsAnnouncement}
            />
          )}
          {/* If isEveryKisa, show anonymous checkbox options */}
          {isEveryKisa && mode === "create" && (
            <RadioGroup
              className="flex gap-1"
              orientation="horizontal"
              defaultValue="none"
              value={anonymousValue}
              onValueChange={setAnonymousValue}
            >
              <Radio value="anonymous">익명</Radio>
              <Radio value="non-anonymous">실명</Radio>
              <Radio
                value="none"
                classNames={{
                  base: cn("hidden"),
                }}
              >
                선택 안함
              </Radio>
            </RadioGroup>
          )}
        </div>

        <PostSubmitButton
          disabled={isSubmitBtnDisabled}
          token={session?.token}
          mode={mode}
          postid={mode === "create" ? null : curPostId}
          formData={
            // when creating a post
            mode === "create"
              ? {
                  type: boardType,
                  title: title,
                  fullname: session?.user.name,
                  email: session?.user.email,
                  text: text,
                  isAnnouncement,
                  anonymous: isEveryKisa
                    ? anonymousValue === "anonymous"
                    : false,
                  readCount: 0,
                }
              : // when updating a post
                {
                  type: boardType,
                  title: title,
                  text: text,
                  isAnnouncement,
                  // when updating a post, anonymous status should be the same as the original post
                }
          }
        />
      </div>
    </div>
  );
}

// [NOTE on rendering method]
// This component is fully CSR (Client-Side Rendering)
// It is like a "main" controller of the Editor component
// different states are handled here
// and passed down to the sub-ui component as props
