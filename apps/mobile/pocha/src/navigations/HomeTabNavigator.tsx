import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import HomeTabBar from '@/components/home/HomeTabBar';

// tabs
import MenuTab from '@/components/menu/MenuTab';
import OrderTab from '@/components/order/OrderTab';

type HomeTabParamList = {
  MenuTab: {pochaID: number};
  OrderTab: {pochaID: number};
};

export type HomeTabProps = MaterialTopTabScreenProps<
  HomeTabParamList,
  'MenuTab'
>;

const Tab = createMaterialTopTabNavigator<HomeTabParamList>();

interface HomeTabNavigatorProps {
  pochaID: number;
}

export default function HomeTabNavigator({pochaID}: HomeTabNavigatorProps) {
  return (
    <Tab.Navigator tabBar={props => <HomeTabBar {...props} />}>
      <Tab.Screen
        name="MenuTab"
        component={MenuTab}
        options={{tabBarLabel: 'Menu'}}
        initialParams={{pochaID}}
      />
      <Tab.Screen
        name="OrderTab"
        component={OrderTab}
        options={{tabBarLabel: 'Order'}}
        initialParams={{pochaID}}
      />
    </Tab.Navigator>
  );
}
