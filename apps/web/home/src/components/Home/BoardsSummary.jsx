"use client";

import React, { useEffect, useState } from "react";

// need to change this api call to "getRecentPosts" and "getHotPosts"
import HomePostView from "./HomePostView";
import { getBoardPosts } from "@/apis/boards/queries";

export default function BoardsSummary() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [hotPosts, setHotPosts] = useState([]);

  // [TODO] 최신, 추천 게시글로 바꾸기

  // 지금은 자유게시판 + 학업 / 취업
  // useBoardPosts 대신 getBoardPosts로 api 콜을 줄이고 있음
  useEffect(() => {
    const fetchAnnouncementPosts = async () => {
      try {
        const res = await getBoardPosts("announcement", 10, 0);
        setHotPosts(res.slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    };
    const fetchAcademicPosts = async () => {
      try {
        const res = await getBoardPosts("academic", 10, 0);
        setHotPosts(res.slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    };
    const fetchCommunityPosts = async () => {
      try {
        const res = await getBoardPosts("community", 10, 0);
        setRecentPosts(res.slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    };

    // fetchAnnouncementPosts();
    fetchAcademicPosts();
    fetchCommunityPosts();
  }, []);

  return (
    <div
      className="w-full
  flex flex-col justify-center 
  md:flex-row gap-4"
    >
      <HomePostView type="academic" posts={hotPosts} />
      <HomePostView type="community" posts={recentPosts} />
    </div>
  );
}
