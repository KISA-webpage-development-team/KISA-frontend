import {Federated} from '@callstack/repack/client';
import React, {lazy, Suspense} from 'react';
import {Text, SafeAreaView} from 'react-native';
import Loading from './Loading';

const Pocha = lazy(() => Federated.importModule('pocha', './App'));

export default function App() {
  return (
    <SafeAreaView>
      <Text>Host App</Text>
      <Suspense fallback={<Loading />}>
        <Pocha />
      </Suspense>
    </SafeAreaView>
  );
}
