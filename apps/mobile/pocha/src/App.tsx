import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen';

export default function PochaApp() {
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <HomeScreen />
      <Text>What the hell</Text>
    </View>
  );
}
