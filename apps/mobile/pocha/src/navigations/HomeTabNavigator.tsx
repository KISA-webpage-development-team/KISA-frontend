import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// tabs
import MenuTab from '@/components/menu/MenuTab';
import OrderTab from '@/components/order/OrderTab';

import {NativeModules} from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function HomeTabNavigator() {
  console.log('RNCViewPager Native Module:', NativeModules.RNCViewPager);
  return (
    <Tab.Navigator>
      <Tab.Screen name="MenuTab" component={MenuTab} />
      <Tab.Screen name="OrderTab" component={OrderTab} />
    </Tab.Navigator>
  );
}
