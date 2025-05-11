import { PochaTab } from "@/types/pocha";

/**
 * @desc update the URL with the selected tab
 * @example "/pocha?tab=menu" <-> "/pocha?tab=orders"
 */
export const updateURLWithTab = (selectedTab: string) => {
  const searchParams = new URLSearchParams({ tab: selectedTab });
  window.history.pushState(
    {},
    "",
    `${window.location.pathname}?${searchParams}`
  );
};
