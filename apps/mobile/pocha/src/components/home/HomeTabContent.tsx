/**
 * HomeTabContent
 * - Displays the menu or order list depending on the active tab
 * - Displays the cart button if the active tab is menu
 */

import {View, Text, Image, StyleSheet} from 'react-native';
import {MenuItem, PochaTab} from '@/types/pocha';
import MenuList from '../menu/MenuList';
import ViewCartButton from '../menu/ViewCartButton'; // Ensure this path is correct or update it to the correct path
// import OrderList from '../order/OrderList';

import {memo} from 'react';
interface HomeTabContentProps {
  activeTab: PochaTab;
  pochaID: number | undefined;
}

function HomeTabContent({activeTab, pochaID}: HomeTabContentProps) {
  return (
    <View style={styles.container}>
      {/* Content Area with Scrollable Section */}
      {activeTab === 'menu' ? (
        <>
          <MenuList pochaid={pochaID} />
          <ViewCartButton pochaID={pochaID} />
        </>
      ) : activeTab === 'orders' ? (
        <OrderList pochaID={pochaID} />
      ) : null}
    </View>
  );
}

export default memo(HomeTabContent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
});
