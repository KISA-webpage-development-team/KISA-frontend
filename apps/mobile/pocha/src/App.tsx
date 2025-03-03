import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';

export default function PochaApp() {
  return (
    <View style={{flex: 1}}>
      <MenuScreen />
    </View>
  );
}
