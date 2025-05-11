// GoBlueButton for post

import { createLike, deleteLike } from "@/apis/likes/mutations";
import { getPostLikesCount } from "@/apis/likes/queries";
import LikeIcon from "@/final_refactor_src/components/icon/LikeIcon";
import { DeleteLikeParams, NewLikeBody } from "@/types/like";
import React, { useEffect, useState } from "react";

type GoBlueButtonProps = {
  didLike: boolean;
  postid: number;
  email: string;
  token?: string;
  likeBtnStale: boolean;
  setLikeBtnStale: (stale: boolean) => void;
  className?: string;
};

export default function GoBlueButton({
  didLike,
  postid,
  email,
  token = "",
  likeBtnStale,
  setLikeBtnStale,
  className = "",
}: GoBlueButtonProps) {
  const [likes, setLikes] = useState<number | null>(null);

  useEffect(() => {
    const fetchPostLikesCount = async () => {
      try {
        const res = await getPostLikesCount(postid);
        if (!res) {
          console.log("Failed to fetch post likes count");
        } else {
          setLikes(res.likesCount);
        }
      } catch (error) {
        console.error("Error fetching post likes count: ", error);
      }
    };

    if (likeBtnStale === false) fetchPostLikesCount();
  }, [postid, likeBtnStale]);

  const handlePostLike = async () => {
    if (!token) {
      window.alert("로그인이 필요한 기능입니다.");
      window.location.href = "/signin" + "?callbackUrl=" + window.location.href;
      return;
    }

    if (likeBtnStale === true) return;

    setLikeBtnStale(true);

    const likeBody = {
      email: email,
      target: "post",
    };

    // if didLike is true, then unlike (delete like)
    // if didLike is false, then like (create like)
    try {
      const res = didLike
        ? await deleteLike(postid, likeBody as DeleteLikeParams, token)
        : await createLike(postid, likeBody as NewLikeBody, token);

      if (res) {
        setLikeBtnStale(false);
        // console.log("Success!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-2 h-8 md:h-10">
      <button
        className={`${className} 
    inline-flex items-center justify-center self-center
  px-4 gap-1 h-full
  bg-[#00274c] border border-[#00274c] 
  text-[#ffcb05] text-sm md:text-base
  hover:bg-[#00274c] hover:border-[#ffcb05]
  rounded-md
    `}
        onClick={handlePostLike}
      >
        <LikeIcon size="small" fill={didLike} color="maize" />
        <span
          className=" font-bold 
        text-sm md:text-base"
        >
          {didLike ? "취소" : "GO BLUE!"}
        </span>
      </button>

      {likes > 0 && (
        <span
          className="[#00274c]
    inline-flex items-center justify-center self-center
  px-2 md:px-3 h-full
   border-2 border-[#00274c]
  text-[#00274c] text-sm md:text-lg
  rounded-md font-bold"
        >
          {likes}
        </span>
      )}
    </div>
  );
}
