/*
 * MenuList
 * - fetch necessary data for menu list (menuList, underAge)
 * - process data for MenuListItem
 * - render MenuListItems for each category
 */

// READ!
// TODO: N/A

// UNUSED IMPORT:
// import LoadingSpinner from '@/final_refactor_src/components/feedback/LoadingSpinner';

// Hooks
// import {useSession} from 'next-auth/react';
// import useMenu from '../../hooks/useMenu';
// import useUserAge from '../../hooks/useUserAge';

// Types
// import {UserSession} from '@/lib/next-auth/types';
// import {MenuItem} from '@/types/pocha';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import MenuItemDetail from './MenuItemDetail';

// interface MenuListProps {
//   pochaid: number | undefined;
// }

import React, {memo, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import MenuListItem from './MenuListItem';
import MenuItemDetail from './MenuItemDetail';
import ViewCartButton from './ViewCartButton';
import {MenuByCategory, MenuItem} from '@/types/pocha';

//   // fetch menu and user age (for under age check)
//   // [NOTE] useMenu and useUserAge uses SWR for better UX
//   // to learn more about SWR, visit https://swr.vercel.app/ko or ask @retz8
// const {menuList, status: menuStatus} = useMenu(pochaid, session?.token);
// const {underAge, status: userStatus} = useUserAge(session);

// if (menuStatus === 'loading' || userStatus === 'loading') {
//   return <LoadingSpinner fullScreen={false} label="메뉴를 가져오는 중..." />;
// }

//   if (menuStatus === 'error') {
//     throw new Error('Error fetching menu');
//   }

//   if (userStatus === 'error') {
//     throw new Error('Error fetching user info');
//   }

export default function MenuList({menuList}: {menuList: MenuByCategory[]}) {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | undefined>(
    undefined,
  );
  const underAge = true; // Mocked (set to false if needed)

  // IF menu is selected, show the menu detail
  if (selectedMenu) {
    return (
      <MenuItemDetail
        // session={session}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        pochaid={123} // temporary for now
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={menuList}
        keyExtractor={(item, idx) => `category-${idx}`}
        renderItem={({item: category}) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            <FlatList
              data={category.menusList}
              keyExtractor={menu => `menu-${menu.menuID}`}
              renderItem={({item: menu}) => (
                <MenuListItem
                  menu={menu}
                  underAge={underAge}
                  setSelectedMenu={setSelectedMenu}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.menuDivider} />}
            />
          </View>
        )}
      />
    </View>
  );
}
// export default memo(MenuList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 22,
    fontFamily: 'Sejonghospital-Bold',
    marginBottom: 4,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
});
