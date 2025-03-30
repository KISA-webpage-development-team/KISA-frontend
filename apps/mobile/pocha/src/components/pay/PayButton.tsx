import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

// ui components
import PochaButton from '@/components/shared/PochaButton';

interface PayButtonProps {
  loading?: boolean;
  totalPrice: number;
  onPress: () => void;
}

export default function PayButton({
  loading = false,
  totalPrice,
  onPress,
}: PayButtonProps) {
  return (
    <View style={styles.container}>
      <PochaButton
        label={loading ? '' : `Pay $${totalPrice}`}
        onClick={onPress}
        disabled={loading}
        icon={loading ? <ActivityIndicator color="white" /> : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
});
