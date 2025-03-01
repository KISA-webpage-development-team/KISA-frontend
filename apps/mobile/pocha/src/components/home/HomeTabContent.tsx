/**
 * HomeTabContent
 * - Displays the menu or order list depending on the active tab
 * - Displays the cart button if the active tab is menu
 */

import {MenuItem, PochaTab} from '@/types/pocha';
import MenuList from '@/features/pocha/components/menu/MenuList';
import OrderList from '@/features/pocha/components/order/OrderList';
import ViewCartButton from '../menu/ViewCartButton';
import {memo} from 'react';
import {View} from 'react-native';
interface HomeTabContentProps {
  activeTab: PochaTab;
  pochaID: number | undefined;
}

function HomeTabContent({activeTab, pochaID}: HomeTabContentProps) {
  return (
    <div className="flex flex-col justify-between w-full relative">
      {/* Content Area with Scrollable Section */}
      {activeTab === 'menu' ? (
        <View>
          <MenuList pochaid={pochaID} />
          <ViewCartButton pochaID={pochaID} />
        </View>
      ) : activeTab === 'orders' ? (
        <OrderList pochaID={pochaID} />
      ) : null}
    </div>
  );
}

export default memo(HomeTabContent);
