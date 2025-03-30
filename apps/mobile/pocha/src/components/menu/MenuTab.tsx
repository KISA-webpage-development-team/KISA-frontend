'use client';

// READ!
// TODO: N/A

// UNUSED IMPORT:
// import {useSearchParams, useRouter} from 'next/navigation';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import TipModal from "@/features/pocha/components/pay/TipModal";

import React from 'react';
import {View, StyleSheet} from 'react-native';

// ui components
import MenuList from '@/components/menu/MenuList';
import ViewCartButton from '@/components/menu/ViewCartButton';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';
import ErrorDisplay from '@/shared/components/feedback/ErrorDisplay';

// hooks
import useMenu from '@/hooks/useMenu';
import useUserToken from '@/hooks/useUserToken';

// types
import {HomeTabProps} from '@/navigations/HomeTabNavigator';

export default function MenuTab({route}: HomeTabProps) {
  const {token, status: tokenStatus, error: tokenError} = useUserToken();

  const pochaID = route.params.pochaID;
  const scrollY = route.params.scrollY;
  const {
    menuList,
    status: menuFetchStatus,
    error: menuFetchError,
  } = useMenu(pochaID, token);

  const isLoading = menuFetchStatus === 'loading' || tokenStatus === 'loading';

  if (isLoading) {
    return <LoadingSpinner label="메뉴를 가져오는 중..." />;
  }

  if (tokenError) {
    return <ErrorDisplay state="error" message={tokenError} />;
  }

  if (menuFetchError) {
    return <ErrorDisplay state="error" message={menuFetchError} />;
  }

  return (
    <View style={styles.container}>
      <MenuList menuList={menuList} scrollY={scrollY} />
      <ViewCartButton pochaID={pochaID} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
  },
});
