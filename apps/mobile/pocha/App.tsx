import {SafeAreaView, Text} from 'react-native';
import React from 'react';

import {Button} from '@repo/ui/button';
import PochaApp from './src/App';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <PochaApp />
    </SafeAreaView>
  );
}
