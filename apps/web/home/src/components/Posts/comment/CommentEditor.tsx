import React, { ChangeEvent, useState } from "react";
import { createComment, updateComment } from "@/apis/comments/mutations";
import { NewCommentBody } from "@/types/comment";
import { CustomButton } from "@/final_refactor_src/components/button";
import { Radio, RadioGroup } from "@nextui-org/react";
import { cn } from "@/utils/styles/cn";
import { UserSession } from "@/lib/next-auth/types";

type CommentEditorProps = {
  isEveryKisa?: boolean;
  mode: "create" | "update" | "reply";
  session: UserSession;
  postid: number;
  commentid?: number;
  curCommentId?: number | null;
  placeholder?: string;
  secret?: boolean;
  setCommentsStale: (value: boolean) => void;
  setOpenCommentEditor?: (value: boolean) => void;
};

export default function CommentEditor({
  isEveryKisa = false,
  mode,
  session,
  postid,
  commentid = 0,
  curCommentId = null,
  placeholder = "댓글을 입력해주세요",
  secret,
  setCommentsStale,
  setOpenCommentEditor = () => {},
}: CommentEditorProps) {
  // comment content
  const [text, setText] = useState<string>(
    placeholder === "댓글을 입력해주세요" ? "" : placeholder
  );

  // anonymous checkbox state
  const [anonymousValue, setAnonymousValue] = useState<string>("none");

  // state to prevent multiple comment submissions at the same time
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [checked, setChecked] = useState<boolean>(
    mode === "update" ? secret : false
  );

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  /**
   * @desc Submit new comment (POST)
   */
  const handleSubmitComment = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // 일반 댓글 + 답글
    const data: NewCommentBody = {
      email: session?.user.email,
      fullname: session?.user.name,
      text: text,
      isCommentOfComment: commentid === 0 ? false : true,
      parentCommentid: commentid,
      anonymous: isEveryKisa ? anonymousValue === "anonymous" : false,
      secret: checked,
    };
    // send post api call to create comment with postid
    const res = await createComment(postid, data, session?.token);

    if (res) {
      // modify states after new comment has been submitted
      setCommentsStale(true);
      setOpenCommentEditor(false);
      setText("");

      setIsSubmitting(false);
      setAnonymousValue("none");

      window.alert("댓글이 등록되었습니다.");
    } else {
      window.alert("댓글 등록에 실패했습니다.");
      // error handling
      // console.log("comment creation failed");
    }
  };

  /**
   * @desc Submit updated comment (PUT)
   */
  const handleSubmitUpdate = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // send update api call
    const data = {
      text: text,
    };

    const res = await updateComment(curCommentId, data, session?.token);
    if (res) {
      setCommentsStale(true);
      setOpenCommentEditor(false);
      setIsSubmitting(false);

      window.alert("댓글이 수정되었습니다.");
    } else {
      // error handling
      console.log("comment update failed");
    }
  };

  const handleSecretChecked = () => {
    setChecked(!checked);
  };

  return (
    <div
      className="flex flex-col sm:flex-row
    items-end sm:items-center w-full"
    >
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full h-20 
             sm:h-32
             border border-gray-300 rounded-md p-3
              text-sm md:text-base
              focus:outline-michigan-blue resize-none"
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            e.target === document.activeElement &&
            !(
              text.length === 0 ||
              (isEveryKisa && anonymousValue === "none") ||
              isSubmitting
            )
          ) {
            e.preventDefault();
            if (mode === "update") {
              handleSubmitUpdate();
            } else {
              handleSubmitComment();
            }
          }
        }}
      />

      <div
        className="w-full sm:w-1/6 sm:h-full
        pt-2
        flex sm:flex-col justify-between
      flex-row md:pl-2"
      >
        {/* If isEveryKisa, show anonymous checkbox options */}
        {isEveryKisa && (
          <>
            <RadioGroup
              className="hidden
              sm:flex gap-1"
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
            <RadioGroup
              className="flex sm:hidden w-1/4"
              size="sm"
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
          </>
        )}
        {!isEveryKisa && (
          <div
            className="flex h-full
          items-center md:items-end md:pb-3"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-3 md:w-4 h-3 md:h-4
                 md:ml-[3px] "
                id="secret"
                name="secret"
                checked={checked}
                onClick={handleSecretChecked}
                disabled={mode === "update"}
              />
              <label
                htmlFor="secret"
                className="
              text-sm md:text-base
              ml-[9px]"
              >
                비밀댓글
              </label>
            </div>
          </div>
        )}

        {/* If isEveryKisa, anonymousValue should be selected */}
        <CustomButton
          disabled={
            text.length === 0 ||
            (isEveryKisa && anonymousValue === "none") ||
            isSubmitting
          }
          onClick={mode === "update" ? handleSubmitUpdate : handleSubmitComment}
          text={isSubmitting ? "..." : "댓글 등록"}
          className="w-fit md:w-full h-fit md:h-fit"
        />
      </div>
    </div>
  );
}
// git switch onboarding
// git pull origin onboarding // update된 코드를 가져온다

// git switch devteam
// git merge onboarding
