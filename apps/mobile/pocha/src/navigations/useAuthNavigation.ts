// hook wrapping useNavigation from react-navigation to handle typescript navigation

// https://lasbe.tistory.com/172

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type AuthStackParam = {
  LandingScreen: undefined;
  SignUpScreen: undefined;
};

export const useAuthNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParam>>();
  return navigation;
};
