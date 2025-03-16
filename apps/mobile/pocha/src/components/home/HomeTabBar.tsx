// HomeTabBar
// : this is used inside of HomeTabNavigator to switch between Menu and Order tabs

// [migrated from web's components/home/HomeTabs.tsx]

// [TODO]
// - implement tab bar UI similar to web's

import {
  View,
  TouchableOpacity,
  Animated,
  Platform,
  StyleSheet,
} from 'react-native';
import React from 'react';

interface HomeTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  position: any;
}

export default function HomeTabBar({
  state,
  descriptors,
  navigation,
  position,
}: HomeTabBarProps) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_: any, i: number) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: number) => (i === index ? 1 : 0.8)),
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <Animated.Text style={{opacity, color: 'black'}}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const tabBarStyles = StyleSheet.create({});
