// hook wrapping useNavigation from react-navigation to handle typescript navigation

// https://lasbe.tistory.com/172

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MainStackParam = {
  HomeScreen: {currentTab: 'MenuTab' | 'OrderTab'};
  CartScreen: {pochaID: number};
  PayScreen: {pochaID: number};
  PaySuccessScreen: undefined;
};

export const useMainNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParam>>();
  return navigation;
};
