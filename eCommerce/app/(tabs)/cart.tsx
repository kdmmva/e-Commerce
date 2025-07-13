import React from 'react';
import { StyleSheet, View } from 'react-native';
import CartDetails from '../../components /Cart/CartDetails';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <CartDetails />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
