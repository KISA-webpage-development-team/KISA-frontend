import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
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
    <View style={{padding: 16, alignItems: 'center'}}>
      <PochaButton
        label={loading ? '' : `Pay $${totalPrice}`}
        onClick={onPress}
        disabled={loading}
        icon={loading ? <ActivityIndicator color="white" /> : undefined}
      />
    </View>
  );
}
