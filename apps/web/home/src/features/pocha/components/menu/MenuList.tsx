/*
 * MenuList
 * - fetch necessary data for menu list (menuList, underAge)
 * - process data for MenuListItem
 * - render MenuListItems for each category
 */

import React, { memo, useState } from "react";

import MenuListItem from "./MenuListItem";
import LoadingSpinner from "@/final_refactor_src/components/feedback/LoadingSpinner";

// Hooks
import { useSession } from "next-auth/react";
import useMenu from "../../hooks/useMenu";
import useUserAge from "../../hooks/useUserAge";

// Types
import { UserSession } from "@/lib/next-auth/types";
import { MenuItem } from "@/types/pocha";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import MenuItemDetail from "./MenuItemDetail";

interface MenuListProps {
  pochaid: number | undefined;
}

function MenuList({ pochaid }: MenuListProps) {
  const { data: session } = useSession() as {
    data: UserSession | null;
    status: string;
  };

  // fetch menu and user age (for under age check)
  // [NOTE] useMenu and useUserAge uses SWR for better UX
  // to learn more about SWR, visit https://swr.vercel.app/ko or ask @retz8
  const { menuList, status: menuStatus } = useMenu(pochaid, session?.token);
  const { underAge, status: userStatus } = useUserAge(session);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);

  if (menuStatus === "loading" || userStatus === "loading") {
    return <LoadingSpinner fullScreen={false} label="메뉴를 가져오는 중..." />;
  }

  if (menuStatus === "error") {
    throw new Error("Error fetching menu");
  }

  if (userStatus === "error") {
    throw new Error("Error fetching user info");
  }

  // IF menu is selected, show the menu detail
  if (selectedMenu) {
    return (
      <MenuItemDetail
        session={session}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        pochaid={pochaid}
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-5 mb-16 gap-4">
      {menuList?.map(({ category, menusList }, categoryIdx) => (
        // menu list by category
        <div
          key={`${category}-${categoryIdx}`}
          className="w-full flex flex-col"
        >
          <span
            className={`${sejongHospitalBold.className} text-xl text-black`}
          >
            {category}
          </span>
          <ul className="mt-1 flex flex-col divide-y-2 divide-gray-200">
            {menusList.map((menu, menuIdx) => (
              <MenuListItem
                key={`${menu.menuID}-${menuIdx}`}
                menu={menu}
                underAge={underAge}
                setSelectedMenu={setSelectedMenu}
                isPriority={categoryIdx === 0 && menuIdx < 3}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default memo(MenuList);
