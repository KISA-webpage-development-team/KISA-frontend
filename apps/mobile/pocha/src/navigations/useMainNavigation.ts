// hook wrapping useNavigation from react-navigation to handle typescript navigation

// https://lasbe.tistory.com/172

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type MainStackParam = {
  HomeScreen: undefined;
  CartScreen: undefined;
  PayScreen: {pochaid: number};
  PaySuccessScreen: undefined;
};

export const useMainNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParam>>();
  return navigation;
};
