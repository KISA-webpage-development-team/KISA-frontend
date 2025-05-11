"use client";

import { SWRConfig } from "swr";
import { fetcher, fetcherWithToken, GlobalOnErrorRetry } from "./fetchers";
import { ReactNode } from "react";

interface SWRProviderProps {
  children: ReactNode;
}

/**
 * @desc SWR Provider with token required GET API calls
 */
export function SWRTokenProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcherWithToken,
        onErrorRetry: GlobalOnErrorRetry,
      }}
    >
      {children}
    </SWRConfig>
  );
}

/**
 * @desc SWR Provider with GET API calls
 */
// [NOTE] This provider is used when token is not required
export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onErrorRetry: GlobalOnErrorRetry,
      }}
    >
      {children}
    </SWRConfig>
  );
}
