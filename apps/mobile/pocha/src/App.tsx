import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import PaySuccessScreen from './screens/PaySuccessScreen';

export default function PochaApp() {
  return (
    <View style={{flex: 1}}>
      {/* <HomeScreen /> */}
      <PaySuccessScreen />
    </View>
  );
}
