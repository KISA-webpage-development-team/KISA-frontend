import React, { useState } from "react";
import { createPost, updatePost } from "@/apis/posts/mutations";
import { useRouter } from "next/navigation";
import { NewPostBody, UpdatePostBody } from "@/types/post";
import { isEveryKisaBoard } from "@/utils/formats/boardType";

// type PostSubmitButtonProps = {
//   disabled: boolean;
//   token: string | undefined;
//   mode: EditorMode;
//   postid: number;
//   formData: NewPostBody | UpdatePostBody;
// };

export default function PostSubmitButton({
  disabled,
  token,
  mode,
  postid,
  formData,
}) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreatePost = async () => {
    try {
      setLoading(true);
      const res = await createPost(formData as NewPostBody, token);
      setLoading(false);

      if (isEveryKisaBoard(formData.type)) {
        window.location.href = `/everykisa/${formData.type}`;
      } else {
        window.location.href = `/boards/${formData.type}`;
      }
    } catch (error) {
      window.alert("게시글 작성에 실패했습니다.");
      return;
    }
  };

  const handleUpdatePost = async () => {
    if (postid === null) {
      window.alert("게시글 수정에 실패했습니다.");
      return;
    }

    try {
      setLoading(true);
      const res = await updatePost(postid, formData, token);

      setLoading(false);

      window.location.href = `/posts/${postid}`;
      // [NOTE] window.location.href is used instead of router.push because the page is not re-rendered
      // This keeps the page from re-rendering and updating content live
    } catch (error) {
      window.alert("게시글 수정에 실패했습니다.");
      setLoading(false);
      return;
    }
  };

  return (
    <button
      disabled={disabled}
      className="w-1/4 h-10 primary_btn text-sm md:text-base"
      onClick={mode === "create" ? handleCreatePost : handleUpdatePost}
    >
      {loading ? "로딩 중..." : mode === "create" ? "등록" : "수정"}
    </button>
  );
}
