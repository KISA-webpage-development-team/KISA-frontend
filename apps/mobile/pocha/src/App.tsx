import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './navigations/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';

export default function PochaApp() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
