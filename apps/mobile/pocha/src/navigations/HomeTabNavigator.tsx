import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeTabBar from '@/components/home/HomeTabBar';

// tabs
import MenuTab from '@/components/menu/MenuTab';
import OrderTab from '@/components/order/OrderTab';

const Tab = createMaterialTopTabNavigator();

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator tabBar={props => <HomeTabBar {...props} />}>
      <Tab.Screen name="MenuTab" component={MenuTab} options={{ tabBarLabel: 'Menu' }}/>
      <Tab.Screen name="OrderTab" component={OrderTab} options={{ tabBarLabel: 'Order' }}/>
    </Tab.Navigator>
  );
}
