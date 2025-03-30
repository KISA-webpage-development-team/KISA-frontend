import {Animated} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import HomeTabBar from '@/components/home/HomeTabBar';

// tabs
import MenuTab from '@/components/menu/MenuTab';
import OrderTab from '@/components/order/OrderTab';

type HomeTabParamList = {
  MenuTab: {pochaID: number; scrollY: Animated.Value};
  OrderTab: {pochaID: number; scrollY: Animated.Value};
};

export type HomeTabProps = MaterialTopTabScreenProps<
  HomeTabParamList,
  'MenuTab' | 'OrderTab'
>;

const Tab = createMaterialTopTabNavigator<HomeTabParamList>();

interface HomeTabNavigatorProps {
  pochaID: number;
  scrollY: Animated.Value;
  currentTab: 'MenuTab' | 'OrderTab';
}

export default function HomeTabNavigator({
  pochaID,
  scrollY,
  currentTab,
}: HomeTabNavigatorProps) {
  return (
    <Tab.Navigator
      tabBar={props => <HomeTabBar {...props} />}
      initialRouteName={currentTab}>
      <Tab.Screen
        name="MenuTab"
        component={MenuTab}
        options={{tabBarLabel: 'MENU'}}
        initialParams={{pochaID, scrollY}}
      />
      <Tab.Screen
        name="OrderTab"
        component={OrderTab}
        options={{tabBarLabel: 'ORDER'}}
        initialParams={{pochaID, scrollY}}
      />
    </Tab.Navigator>
  );
}
