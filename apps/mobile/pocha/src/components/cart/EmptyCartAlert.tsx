import {View, Text, Image, StyleSheet} from 'react-native';

export default function EmptyCartAlert() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/empty_cart.png')}
        style={styles.image}
      />
      <Text style={[styles.alertText]}>Your Cart is Empty</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  alertText: {
    textAlign: 'center',
    marginTop: 16, // Equivalent to mt-4 in Tailwind
    fontFamily: 'sejong-hospital-light',
    fontWeight: '600',
    fontSize: 20,
  },
});
