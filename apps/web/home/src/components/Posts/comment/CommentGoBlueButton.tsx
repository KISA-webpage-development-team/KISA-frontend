// GoBlueButton component for comments

import { createLike, deleteLike } from "@/apis/likes/mutations";
import { getCommentLikesCount } from "@/apis/likes/queries";
import LikeIcon from "@/final_refactor_src/components/icon/LikeIcon";
import { DeleteLikeParams, NewLikeBody } from "@/types/like";
import React, { useEffect, useState } from "react";

type GoBlueButtonProps = {
  didLike: boolean;
  commentid: number;
  email: string;
  token?: string;
  likes?: number;
  likeBtnStale: boolean;
  setLikeBtnStale: (stale: boolean) => void;
  className?: string;
};

export default function CommentGoBlueButton({
  didLike,
  commentid,
  email,
  token = "",
  likeBtnStale,
  setLikeBtnStale,
  className = "",
}: GoBlueButtonProps) {
  const [likes, setLikes] = useState<number | null>(null);

  useEffect(() => {
    const fetchCommentLikesCount = async () => {
      try {
        const res = await getCommentLikesCount(commentid);
        if (!res) {
          console.log("Failed to fetch Comment likes count");
        } else {
          setLikes(res.likesCount);
        }
      } catch (error) {
        console.error("Error fetching Comment likes count: ", error);
      }
    };

    if (likeBtnStale === false) fetchCommentLikesCount();
  }, [commentid, likeBtnStale]);

  const handleCommentLike = async () => {
    if (!token) {
      window.alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (likeBtnStale === true) return;

    setLikeBtnStale(true);

    const likeBody = {
      email: email,
      target: "comment",
    };

    // if didLike is true, then unlike (delete like)
    // if didLike is false, then like (create like)
    try {
      const res = didLike
        ? await deleteLike(commentid, likeBody as DeleteLikeParams, token)
        : await createLike(commentid, likeBody as NewLikeBody, token);

      if (res) {
        // console.log("Success!");
        setLikeBtnStale(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${className} 
    inline-flex items-center self-center gap-1 
    rounded-md
    `}
    >
      <button
        onClick={handleCommentLike}
        className={`disabled:cursor-not-allowed`}
      >
        <LikeIcon size="small" fill={didLike} />
      </button>
      {likes > 0 && (
        <span className="text-xs md:text-sm text-michigan-light-blue">
          {likes}
        </span>
      )}
    </div>
  );
}
