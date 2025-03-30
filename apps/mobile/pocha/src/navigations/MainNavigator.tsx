import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, Text} from 'react-native';

// hooks
import {useMainNavigation} from '@/navigations/useMainNavigation';

// screens
import HomeScreen from '@/screens/HomeScreen';
import CartScreen from '@/screens/CartScreen';
import PayScreen from '@/screens/PayScreen';
import PaySuccessScreen from '@/screens/PaySuccessScreen';

// types
import {MainStackParam} from '@/navigations/useMainNavigation';

// ui components
import BackIcon from '@/shared/components/icon/BackIcon';

const Stack = createNativeStackNavigator<MainStackParam>();

const HeaderBackButton = () => {
  const navigation = useMainNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleGoBack}>
      <BackIcon />
    </TouchableOpacity>
  );
};

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        // [TODO] more header custom styling
        // Custom back button
        headerTitleStyle: {
          fontFamily: 'Sejong-hospital-Bold',
        },
        headerLeft: () => <HeaderBackButton />,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerTitle: 'Cart',
        }}
      />
      <Stack.Screen
        name="PayScreen"
        component={PayScreen}
        options={{
          headerTitle: 'Pay',
        }}
      />
      <Stack.Screen
        name="PaySuccessScreen"
        component={PaySuccessScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
