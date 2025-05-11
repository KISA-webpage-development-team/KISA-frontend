// Custom hook to fetch data for UserBoard

import { useUserComments, useUserPosts } from "@/apis/users/swrHooks";
import { useState } from "react";

// <Business Logic>
// 1. Fetch the user's posts.
// 2. Fetch the user's comments.
// 3. Create a toggle switch for opening and closing posts.

type ActiveViewOptions = "posts" | "comments";

const useUserBoard = (email: string, token: string | null) => {
  const [activeView, setActiveView] = useState<ActiveViewOptions>("posts");

  const {
    posts,
    isLoading: isUserPostsLoading,
    error: userPostsError,
  } = useUserPosts(email, token);
  const {
    comments,
    isLoading: isUserCommentsLoading,
    error: userCommentsError,
  } = useUserComments(email, token);

  return {
    activeView,
    setActiveView,
    posts,
    comments,
    isLoading: isUserPostsLoading || isUserCommentsLoading,
    error: userPostsError || userCommentsError,
  };
};

export default useUserBoard;
