import React from 'react';
import InfoIcon from '@/assets/icons/info_icon';
import {View, Text, StyleSheet} from 'react-native';

// NOTE to JIOH: We've tried using the svg icons the same way as your example (home icon) but it didn't work,
// but neither home icon nor our icon worked. So, we changed the file to .tsx instead (checkout info_icon.tsx)
// and implemented the code there, to bring the InfoIcon straight into this file.

interface ErrorDisplayProps {
  state?: string;
  message?: string;
}
export default function ErrorDisplay({state, message}: ErrorDisplayProps) {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <InfoIcon
        width={15}
        height={15}
        fill={state === 'error' ? 'red' : 'blue'} // Change color based on state
      />
      <Text
        style={[styles.text, state === 'error' ? styles.error : styles.alert]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  text: {
    fontSize: 12,
  },
  error: {
    color: 'red',
  },
  alert: {
    color: 'blue',
  },
});
