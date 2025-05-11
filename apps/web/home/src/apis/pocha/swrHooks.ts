import { SWRConfiguration } from "swr";

import { immutableOption } from "@/lib/swr/options";
import useSWR from "swr";
import { CustomAxiosError } from "@/lib/axios/types";
import { MenuByCategory } from "@/types/pocha";

export function usePochaMenu(
  pochaID: number,
  token: string,
  options: SWRConfiguration = immutableOption
): {
  menu: MenuByCategory[] | undefined;
  isLoading: boolean;
  error: CustomAxiosError | undefined;
} {
  const url = `/pocha/menu/${pochaID}/`;

  const { data, error, isLoading } = useSWR(url, options);

  console.log(data);

  return {
    menu: data?.data,
    isLoading,
    error: error,
  };
}
