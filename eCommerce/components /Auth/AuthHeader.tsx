import { useCallback, useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

interface AuthHeaderProps {
  isLogin: boolean;
  onSwitch: () => void;
}

export default function AuthHeader({ isLogin, onSwitch }: AuthHeaderProps) {
  const animation = useRef(new Animated.Value(isLogin ? 0 : 1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const textScale = useRef(new Animated.Value(1)).current;

  const runAnimations = useCallback(
    (toValue: number) => {
      Animated.parallel([
        Animated.spring(animation, {
          toValue,
          stiffness: 120,
          damping: 15,
          mass: 1,
          useNativeDriver: false,
        }),
        Animated.sequence([
          Animated.timing(textScale, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(textScale, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.7,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    },
    [animation, fadeAnim, textScale]
  );

  useEffect(() => {
    runAnimations(isLogin ? 0 : 1);
  }, [isLogin, runAnimations]);

  const left = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"],
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.mainTitle}>
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </Text>
        <Text style={styles.subTitle}>
          {isLogin
            ? "Log in to explore all features"
            : "Join us to access exclusive content"}
        </Text>
      </Animated.View>

      <View style={styles.tabContainer}>
        <Animated.View style={[styles.activeIndicator, { left }]} />

        <Pressable onPress={!isLogin ? onSwitch : undefined} style={styles.tab}>
          <Animated.Text
            style={[
              styles.tabText,
              isLogin && styles.activeTabText,
              { transform: [{ scale: textScale }] },
            ]}
          >
            Login
          </Animated.Text>
        </Pressable>

        <Pressable onPress={isLogin ? onSwitch : undefined} style={styles.tab}>
          <Animated.Text
            style={[
              styles.tabText,
              !isLogin && styles.activeTabText,
              { transform: [{ scale: textScale }] },
            ]}
          >
            Register
          </Animated.Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 40,
    paddingHorizontal: 32,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 52,
    position: "relative",
    marginTop: 32,
    backgroundColor: "rgba(242, 242, 242, 0.7)",
    borderRadius: 26,
    padding: 3,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#292526",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#787676",
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 24,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  activeIndicator: {
    position: "absolute",
    height: "100%",
    width: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    top: 0,
    shadowColor: "#A3A1A2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A3A1A2",
    letterSpacing: 0.3,
  },
  activeTabText: {
    color: "#292526",
    fontWeight: "700",
  },
});
