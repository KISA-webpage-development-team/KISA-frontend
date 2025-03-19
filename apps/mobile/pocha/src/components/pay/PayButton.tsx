import {
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  GestureResponderEvent,
} from 'react-native';

import React from 'react';

interface PayButtonProps {
  loading?: boolean;
  totalPrice: number;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function PayButton({
  loading = false,
  totalPrice,
  onPress,
}: PayButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={onPress} disabled={loading}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>Pay ${totalPrice}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'cornflowerblue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  buttonDisabled: {
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
