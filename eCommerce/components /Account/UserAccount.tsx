import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserOrders } from "../../api/orders";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";


const UserAccount = () => {
  const { user, logout } = useAuthStore();
  const { cart } = useCartStore();

  const [ordersCount, setOrdersCount] = useState<number>(0);

  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        getUserOrders(user.id)
          .then((orders) => {
            setOrdersCount(orders.length);
          })
          .catch((err) => {
            console.error("Error loading orders:", err);
            setOrdersCount(0);
          });
      }
    }, [user?.id])
  );
  

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Authentication required</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PROFILE</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCore}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={32} color="#111" />
          </View>
          <View style={styles.userEssentials}>
            <Text style={styles.username}>{user.nickname || "@username"}</Text>
            <Text style={styles.email}>{user.email || "email@domain.com"}</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </Text>
            <Text style={styles.statLabel}>ORDERS</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{ordersCount}</Text>
            <Text style={styles.statLabel}>PURCHASES</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <MenuItem icon="card-outline" title="PAYMENT" />
          <MenuItem icon="time-outline" title="HISTORY" />
          <MenuItem icon="settings-outline" title="SETTINGS" />
          <MenuItem icon="help-circle-outline" title="SUPPORT" />
        </View>

        <Pressable style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>SIGN OUT</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

type IconName =
  | "card-outline"
  | "time-outline"
  | "settings-outline"
  | "help-circle-outline";

const MenuItem = ({ icon, title }: { icon: IconName; title: string }) => (
  <Pressable style={styles.menuItem}>
    <Ionicons name={icon} size={18} color="#111" />
    <Text style={styles.menuText}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 16 : 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111",
    textAlign: "center",
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileCore: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  userEssentials: {
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: "#888",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  stat: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "400",
    color: "#111",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "#888",
    letterSpacing: 1,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: "#f0f0f0",
  },
  menu: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8",
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    color: "#111",
    marginLeft: 16,
  },
  logout: {
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 13,
    color: "#888",
    letterSpacing: 1,
  },
  errorText: {
    marginTop: 100,
    textAlign: "center",
    fontSize: 14,
    color: "#888",
  },
});

export default UserAccount;
