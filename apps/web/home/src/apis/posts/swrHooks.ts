import useSWR, { SWRConfiguration } from "swr";
import { immutableOption } from "@/lib/swr/options";
import { Post } from "@/types/post";
import { CustomAxiosError } from "@/lib/axios/types";
import { BoardType } from "@/types/board";

/**
 * @desc Fetch a post with the given postid [TOKEN NOT REQUIRED]
 * @route GET /posts/:postid/
 */
// [TODO] usePost function should be real-time
// which means, options shouldn't be set to immutableOption
// and should be set to defaultOption

// BUT for now, there are not many users in the system,
// so we set the options to immutableOption

// [NOTE]
// options can be something like...
// - immutableOption to disable revalidation
// - { fetcher: fetcherWithToken } to enable token required GET API calls
// - { fetcher: fetcher } to enable GET API calls without token
export function usePost(
  postid: number,
  options: SWRConfiguration = immutableOption
): {
  post: Post | undefined;
  isLoading: boolean;
  error: CustomAxiosError | undefined;
} {
  const url = `/posts/${postid}/`;

  const fakeData = {
    postid: 507,
    title: "캠퍼스 시설 이용 안내",
    created: "2022-01-06T11:00:00",
    type: BoardType.Community,
    fullname: "정현우",
    email: "hyunwooj@umich.edu",
    readCount: 120,
    commentsCount: 8,
    anonymous: true,
    text: "안녕하세요. 캠퍼스 시설 이용 안내입니다. 캠퍼스 시설을 이용하실 때 주의사항을 꼭 숙지하시기 바랍니다.",
    isAnnouncement: false,
  };

  const { data, error, isLoading } = useSWR(
    postid && postid !== 507 ? url : null,
    options
  );

  return {
    post: postid === 507 ? fakeData : data,
    isLoading,
    error,
  };
}
