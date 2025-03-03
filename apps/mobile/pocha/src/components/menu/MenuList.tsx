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

interface MenuItem {
  menuID: number;
  nameKor: string;
  nameEng: string;
  price: number;
  stock: number;
  ageCheckRequired: boolean;
}

// Mock Data — Instead of fetching with API
// Checks for: age restriction, stock availability
const mockMenuList = [
  {
    category: '안주',
    menusList: [
      {
        menuID: 1,
        nameKor: '김치전',
        nameEng: 'Kimchi Pancake',
        price: 9.99,
        stock: 10,
        ageCheckRequired: false,
      },
      {
        menuID: 2,
        nameKor: '불고기',
        nameEng: 'Bulgogi',
        price: 15.99,
        stock: 3,
        ageCheckRequired: false,
      },
      {
        menuID: 8,
        nameKor: '순대',
        nameEng: 'Sundae',
        price: 8.99,
        stock: 0,
        ageCheckRequired: false,
      },
      {
        menuID: 9,
        nameKor: '떡볶이',
        nameEng: 'Tteokbokki',
        price: 7.99,
        stock: 5,
        ageCheckRequired: false,
      },
    ],
  },
  {
    category: '특별 메뉴',
    menusList: [
      {
        menuID: 3,
        nameKor: '족발',
        nameEng: 'Pork Feet',
        price: 24.99,
        stock: 0,
        ageCheckRequired: false,
      },
      {
        menuID: 4,
        nameKor: '삼겹살',
        nameEng: 'Pig Belly',
        price: 20.99,
        stock: 3,
        ageCheckRequired: false,
      },
    ],
  },
  {
    category: '주류',
    menusList: [
      {
        menuID: 5,
        nameKor: '참이슬',
        nameEng: 'Chamesul Soju',
        price: 12.99,
        stock: 5,
        ageCheckRequired: true,
      },
      {
        menuID: 6,
        nameKor: '카스',
        nameEng: 'Cass Beer',
        price: 5.99,
        stock: 0,
        ageCheckRequired: true,
      },
      {
        menuID: 7,
        nameKor: '막걸리',
        nameEng: 'Makgeolli',
        price: 6.99,
        stock: 2,
        ageCheckRequired: true,
      },
    ],
  },
];

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

export default function MenuList() {
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
        data={mockMenuList}
        keyExtractor={(item, idx) => `category-${idx}`}
        renderItem={({item: category}) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            <FlatList
              data={category.menusList}
              keyExtractor={menu => `menu-${menu.menuID}`}
              renderItem={({item: menu}) => (
                <MenuListItem
                  // key={`${menu.menuID}-${menuIdx}`} - CHECK w/ DS
                  menu={menu}
                  underAge={underAge}
                  setSelectedMenu={setSelectedMenu}
                  // isPriority={categoryIdx === 0 && menuIdx < 3} - CHECK w/ DS
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.menuDivider} />}
            />
          </View>
        )}
      />
      <ViewCartButton pochaID={123} />
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
});
