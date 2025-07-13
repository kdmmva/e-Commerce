import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: "home",
  favorite: "heart",
  cart: "cart-outline",
  account: "person",
};

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={({ route }) => {
          const iconName = TAB_ICONS[route.name];

          return {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "rgba(255, 255, 255, 0.7)",
            tabBarStyle:
              route.name === "cart"
                ? { display: "none" }
                : {
                    ...styles.tabBarStyle,
                    marginLeft: 40,
                  },
            tabBarItemStyle: styles.tabBarItemStyle,
            tabBarIcon: ({ color, focused }) => {
              if (!iconName) return null;

              return (
                <View style={styles.iconOuterContainer}>
                  <View
                    style={[
                      styles.iconContainer,
                      focused && styles.iconContainerFocused,
                    ]}
                  >
                    <Ionicons
                      name={iconName}
                      size={24}
                      color={color}
                      style={styles.icon}
                    />
                  </View>
                </View>
              );
            },
          };
        }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="favorite" />
        <Tabs.Screen name="cart" />
        <Tabs.Screen name="account" />
        <Tabs.Screen name="index" options={{ href: null }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  tabBarStyle: {
    position: "absolute",
    backgroundColor: "#292526",
    bottom: 24,
    width: 320,
    height: 65,
    borderRadius: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  tabBarItemStyle: {
    height: "50%",
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  iconOuterContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerFocused: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  icon: {
    marginTop: 2,
  },
});
