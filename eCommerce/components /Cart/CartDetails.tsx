import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { usePurchase } from "../../hooks/usePurchase";
import useCartStore from "../../store/cartStore";

const CartDetails = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { cart, removeFromCart } = useCartStore();

  const handlePay = usePurchase();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={20} color="#121111" />
          </Pressable>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={styles.menuButton}>
            <Ionicons name="menu-outline" size={20} color="#121111" />
          </View>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          {cart.map((item, index) => (
            <View key={`${item.name}-${index}`} style={styles.cartItem}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>Dress modern</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <Pressable
                onPress={() => removeFromCart(item.name)}
                style={styles.removeButton}
              >
                <Ionicons name="close" size={20} color="#787676" />
              </Pressable>
            </View>
          ))}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Information</Text>
            <View style={styles.paymentCard}>
              <View style={styles.cardContent}>
                <Ionicons name="card" size={24} color="#433F40" />
                <Text style={styles.paymentText}>VISA •••• •••• •••• 2143</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>
                Total ({totalItems} items)
              </Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Shipping Fee</Text>
              <Text style={styles.summaryValue}>$0.00</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.summaryValue}>$0.00</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalLabel}>Sub Total</Text>
            <Text style={styles.subtotalValue}>${subtotal.toFixed(2)}</Text>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
        <Pressable style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>Pay</Text>
        </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#DFDEDE",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#DFDEDE",
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#DFDEDE",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#121111",
    lineHeight: 22.4,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
    paddingTop: 16,
  },
  cartItem: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    marginTop: 24,
    alignItems: "center",
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 14,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
    height: 70,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#121111",
    marginBottom: 4,
    maxWidth: "80%",
  },
  itemDescription: {
    fontSize: 10,
    color: "#787676",
    marginBottom: 4,
    maxWidth: "80%",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#292526",
    marginTop: 4,
  },
  removeButton: {
    padding: 8,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#121111",
    lineHeight: 19.6,
    marginBottom: 16,
  },
  paymentCard: {
    width: "100%",
    height: 62,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentText: {
    fontSize: 16,
    color: "#787676",
    marginLeft: 12,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#787676",
  },
  summaryValue: {
    fontSize: 14,
    color: "#121111",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginTop: 24,
  },
  subtotalContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#121111",
  },
  subtotalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#121111",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
  },
  payButton: {
    height: 60,
    backgroundColor: "#121111",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CartDetails;
