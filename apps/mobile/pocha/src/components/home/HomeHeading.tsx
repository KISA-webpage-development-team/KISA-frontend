import React from 'react';
import {PochaInfo} from '../../types/pocha';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useUser} from '@/contexts/UserContext';

interface HomeHeadingProps {
  pochaInfo: PochaInfo | undefined;
}

export default function HomeHeading({pochaInfo}: HomeHeadingProps) {
  const {signOut} = useUser();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{pochaInfo?.title}</Text>

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
    fontFamily: 'Sejong-hospital-Bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
});
