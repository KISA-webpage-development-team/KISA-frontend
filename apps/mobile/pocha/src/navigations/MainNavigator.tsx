import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import HomeScreen from '@/screens/HomeScreen';
import CartScreen from '@/screens/CartScreen';
import PayScreen from '@/screens/PayScreen';
import PaySuccessScreen from '@/screens/PaySuccessScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="PayScreen" component={PayScreen} />
      <Stack.Screen name="PaySuccessScreen" component={PaySuccessScreen} />
    </Stack.Navigator>
  );
}
