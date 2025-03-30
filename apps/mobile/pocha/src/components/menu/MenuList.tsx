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
import {FlatList, Text, View, StyleSheet, Animated} from 'react-native';
import MenuListItem from './MenuListItem';
import MenuItemDetail from './MenuItemDetail';
import ViewCartButton from './ViewCartButton';
import {MenuByCategory, MenuItem} from '@/types/pocha';
import useUserToken from '@/hooks/useUserToken';
import useUserAge from '@/hooks/useUserAge';
import {useUser} from '@/contexts/UserContext';
import {SimpleUser} from '@/types/user';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';
import ErrorDisplay from '@/shared/components/feedback/ErrorDisplay';
import useMenu from '@/hooks/useMenu';
import HorizontalDivider from '@/shared/components/divider/HorizontalDivider';

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

interface MenuListProps {
  pochaID: number;
  scrollY: Animated.Value;
}

export default function MenuList({pochaID, scrollY}: MenuListProps) {
  // get user from firebase context
  const {user} = useUser();
  const loggedInUser = user as SimpleUser;

  const [selectedMenu, setSelectedMenu] = useState<MenuItem | undefined>(
    undefined,
  );
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  // get token from keychain
  const {token, status: tokenStatus, error: tokenError} = useUserToken();

  // get user age from backend
  const {
    underAge,
    status: userAgeStatus,
    error: userAgeError,
  } = useUserAge(loggedInUser.email, token);

  // get menu from backend
  const {
    menuList,
    status: menuStatus,
    error: menuError,
  } = useMenu(pochaID, token);

  const isLoading =
    tokenStatus === 'loading' ||
    userAgeStatus === 'loading' ||
    menuStatus === 'loading';

  if (isLoading) {
    return <LoadingSpinner fullScreen={false} label="메뉴를 가져오는 중..." />;
  }

  if (tokenError) {
    return <ErrorDisplay fullScreen state="error" message={tokenError} />;
  }

  if (userAgeError) {
    return <ErrorDisplay fullScreen state="error" message={userAgeError} />;
  }

  if (menuError) {
    return <ErrorDisplay fullScreen state="error" message={menuError} />;
  }

  // IF menu is selected, show the menu detail
  const handleMenuSelect = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setIsDetailVisible(true);
  };

  const handleCloseDetail = () => {
    // First hide the modal
    setIsDetailVisible(false);
    // Then clear the selected menu after animation completes
    setTimeout(() => {
      setSelectedMenu(undefined);
    }, 300); // Match this with the slide animation duration
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
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
                  setSelectedMenu={handleMenuSelect}
                />
              )}
              ItemSeparatorComponent={() => <HorizontalDivider />}
            />
          </View>
        )}
      />
      <MenuItemDetail
        selectedMenu={selectedMenu!}
        setSelectedMenu={() => handleCloseDetail()}
        pochaID={pochaID}
        visible={isDetailVisible}
      />
    </View>
  );
}
// export default memo(MenuList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '4%',
    paddingBottom: '2%',
  },
  categoryContainer: {
    marginBottom: '4%',
    paddingHorizontal: '4%',
  },
  categoryTitle: {
    fontSize: 22,
    fontFamily: 'Sejong-hospital-Bold',
    marginBottom: 4,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
});
