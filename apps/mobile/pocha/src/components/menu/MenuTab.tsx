'use client';

// READ!
// TODO: N/A

// UNUSED IMPORT:
// import {useSearchParams, useRouter} from 'next/navigation';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import TipModal from "@/features/pocha/components/pay/TipModal";

import React, {useEffect} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import MenuList from '@/components/menu/MenuList';
import {HomeTabProps} from '@/navigations/HomeTabNavigator';
import useMenu from '@/hooks/useMenu';
import {useUser} from '@/contexts/UserContext';
import ViewCartButton from './ViewCartButton';

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
        isImmediatePrep: false,
        parentPochaId: 30,
        ageCheckRequired: false,
      },
      {
        menuID: 2,
        nameKor: '불고기',
        nameEng: 'Bulgogi',
        price: 15.99,
        stock: 3,
        isImmediatePrep: false,
        parentPochaId: 31,
        ageCheckRequired: false,
      },
      {
        menuID: 8,
        nameKor: '순대',
        nameEng: 'Sundae',
        price: 8.99,
        stock: 0,
        isImmediatePrep: false,
        parentPochaId: 32,
        ageCheckRequired: false,
      },
      {
        menuID: 9,
        nameKor: '떡볶이',
        nameEng: 'Tteokbokki',
        price: 7.99,
        stock: 5,
        isImmediatePrep: false,
        parentPochaId: 33,
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
        isImmediatePrep: false,
        parentPochaId: 34,
        ageCheckRequired: false,
      },
      {
        menuID: 4,
        nameKor: '삼겹살',
        nameEng: 'Pig Belly',
        price: 20.99,
        stock: 3,
        isImmediatePrep: false,
        parentPochaId: 35,
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
        isImmediatePrep: true,
        parentPochaId: 36,
        ageCheckRequired: true,
      },
      {
        menuID: 6,
        nameKor: '카스',
        nameEng: 'Cass Beer',
        price: 5.99,
        stock: 0,
        isImmediatePrep: true,
        parentPochaId: 37,
        ageCheckRequired: true,
      },
      {
        menuID: 7,
        nameKor: '막걸리',
        nameEng: 'Makgeolli',
        price: 6.99,
        stock: 2,
        isImmediatePrep: true,
        parentPochaId: 38,
        ageCheckRequired: true,
      },
    ],
  },
];

export default function MenuTab({route}: HomeTabProps) {
  // Example of using the logged in user (this is same type as the "session" from the web)
  const {user} = useUser();
  const pochaID = route.params.pochaID;

  // const {menuList, status: menuStatus, error} = useMenu(pochaID);

  // if (menuStatus === 'loading') {
  //   return <ActivityIndicator size="large" />;
  // }

  // if (menuStatus === 'error') {
  //   return <Text>Error: {error}</Text>;
  // }

  return (
    <View style={styles.container}>
      <MenuList menuList={mockMenuList} />
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
