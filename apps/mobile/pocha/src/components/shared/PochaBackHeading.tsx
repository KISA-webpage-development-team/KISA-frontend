import {useMainNavigation} from '@/navigations/useMainNavigation';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface PochaBackHeadingProps {
  title: string;
}

export default function PochaBackHeading({title}: PochaBackHeadingProps) {
  const navigation = useMainNavigation();

  const handleGoBack = () => {
    console.log('Go Back');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.backbutton}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12, // Equivalent to py-3
    position: 'relative',
  },
  button: {
    position: 'absolute',
    zIndex: 100,
    left: 12, // Equivalent to left-3
  },
  backbutton: {
    fontSize: 25, // Equivalent to text-xl
  },
  title: {
    width: '100%',
    fontSize: 20, // Equivalent to text-xl
    textAlign: 'center',
    color: '#00274C', // Michigan Blue Hex color (if you have the hex value for Michigan Blue)
  },
});
