// SWR fetchers
import client from "@/lib/axios/client";

/**
 * @desc SWR fetcher object with axios
 */
const fetcher = (url) =>
  client
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

/**
 *  @desc SWR fetcher object with axios and token
 */
// [NOTE] need to use this fetcher when backend api required token (@token_required)
const fetcherWithToken = ([url, token]) =>
  client
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

/**
 * @desc useSWR을 이용한 GET API Call 실패 시 재시도 로직
 */
// [NOTE] (24.07.10 ~) 불필요한 api 콜 재시도를 줄이기 위해 재시도 자체를 안하는 옵션을 사용중
// 이후에 재시도 로직이 필요하다면 아래 Configuration을 사용 및 수정할 것
const GlobalOnErrorRetry = (error, key, config, revalidate, { retryCount }) => {
  // 404에서 재시도 안함
  if (error?.response?.status === 404) return;

  // 401에서 재시도 안함
  if (error?.response?.status === 401) return;

  // 1번까지만 재시도함
  if (retryCount >= 1) return;

  // 5초 후에 재시도
  setTimeout(() => revalidate({ retryCount }), 5000);
};

export { fetcher, fetcherWithToken, GlobalOnErrorRetry };
