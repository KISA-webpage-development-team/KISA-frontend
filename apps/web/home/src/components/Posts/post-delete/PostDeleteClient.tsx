"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/apis/posts/mutations";

// sub-ui components
import ImageButton from "../../shared/ImageButton";
import TrashcanIcon from "../../ui/TrashcanIcon";
import PencilIcon from "../../ui/PencilIcon";
import { isEveryKisaBoard } from "@/utils/formats/boardType";

export default function PostDeleteClient({ session, boardType, postid }) {
  const router = useRouter();

  const onClickPostDeleteCancel = () => {
    router.push(`/posts/${postid}`);
  };

  const onClickPostDeleteConfirm = async () => {
    const res = await deletePost(postid, session?.token);
    if (res) {
      // Updated status code to represent successful deletion
      // need to fix: should go remember its board name
      if (isEveryKisaBoard(boardType)) {
        window.location.href = `/everykisa/${boardType}`;
      } else {
        window.location.href = `/board/${boardType}`;
      }
      return;
    } else {
      window.alert("게시글 삭제에 실패했습니다.");
      // console.error(res);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <ImageButton
        icon={<PencilIcon color="gray" />}
        text="취소"
        onClick={onClickPostDeleteCancel}
      />
      <ImageButton
        icon={<TrashcanIcon color="gray" />}
        text="삭제"
        onClick={onClickPostDeleteConfirm}
      />
    </div>
  );
}
