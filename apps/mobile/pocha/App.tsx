import {SafeAreaView, Text} from 'react-native';
import React from 'react';

import {Button} from '@repo/ui/button';
import PochaApp from './src/App';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'pink'}}>
      <Text>App Pcoha</Text>
      {/* <Button text="Click me" onClick={() => {}} /> */}
      <PochaApp />
      <Text>What the hell2</Text>
    </SafeAreaView>
  );
}
