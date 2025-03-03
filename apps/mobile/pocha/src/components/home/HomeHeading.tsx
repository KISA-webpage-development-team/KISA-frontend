import React from 'react';
import {PochaInfo} from '../../types/pocha';
import {View, Text, StyleSheet} from 'react-native';

interface HomeHeadingProps {
  pochaInfo: PochaInfo | undefined;
}

export default function HomeHeading({pochaInfo}: HomeHeadingProps) {
  return (
    <View style={styles.container} id="pocha-heading">
      {/* Title - pocha name */}
      <Text style={styles.title}>{pochaInfo?.title}</Text>

      {/* Description - pocha description */}
      <Text style={styles.description}>{pochaInfo?.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Sejonghospital-Bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
});
