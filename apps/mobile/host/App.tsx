import {Federated} from '@callstack/repack/client';
import React, {lazy, Suspense} from 'react';
import {Text, SafeAreaView} from 'react-native';
import Loading from './Loading';

const Pocha = lazy(() => Federated.importModule('pocha', './App'));
const Wanted = lazy(() => Federated.importModule('wanted', './App'));
// const EveryKisa = lazy(() => Federated.importModule('everykisa', './App'));

export default function App() {
  return (
    <SafeAreaView>
      <Text>Host App!</Text>
      <Suspense fallback={<Loading />}>
        <Pocha />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Wanted />
      </Suspense>
      {/* <Suspense fallback={<Loading />}>
        <EveryKisa />
      </Suspense> */}
    </SafeAreaView>
  );
}
