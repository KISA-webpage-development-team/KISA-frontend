// [NOTE]
// This is to prevent the menu from being fetched multiple times when the user scrolls up and down
// 기존의 pocha 훅들과는 다르게 생겼으나, 당황하지 말고 SWR 공식문서를 참고하자
// https://swr.vercel.app/ko

import useSWR from "swr";
import { fetcherWithToken } from "@/lib/swr/fetchers";
import { MenuByCategory } from "@/types/pocha";

/**
 * @desc hook to fetch menu of pocha with SWR and existing fetcher
 */
const useMenu = (pochaID: number, token: string) => {
  const {
    data: menuList,
    error,
    isLoading,
  } = useSWR(
    pochaID && token ? [`/pocha/menu/${pochaID}/`, token] : null,
    fetcherWithToken,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  return {
    menuList: menuList as MenuByCategory[],
    status: error ? "error" : isLoading ? "loading" : "success",
  };
};

export default useMenu;
