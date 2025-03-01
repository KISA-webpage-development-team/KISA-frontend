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
      <Text style={styles.title}>Halloween Pcoha</Text>

      {/* Description - pocha description */}
      <Text style={styles.description}>dasfdfasdf</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
});
