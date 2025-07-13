import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthButton from "../../components /Auth/AuthButton";
import AuthHeader from "../../components /Auth/AuthHeader";
import SocialLoginOptions from "../../components /Auth/SocialLoginOptions";
import TextField from "../../components /Auth/TextField";
import useAuthStore from "../../store/authStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AuthHeader isLogin={true} onSwitch={() => router.replace("/register")} />

      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        secureTextEntry
      />

      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={styles.rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && <View style={styles.checkboxInner} />}
          </View>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/otp")}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <AuthButton
        title="Log In"
        onPress={async () => {
          try {
            await login(email, password);
            router.replace("/(tabs)"); 
          } catch (error) {
            console.error("Login error:", error);
          }
        }}
      />

      <SocialLoginOptions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#787676",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    borderColor: "#292526",
    backgroundColor: "#292526",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: "#F2F2F2",
  },
  rememberMeText: {
    color: "#292526",
    fontSize: 14,
    fontWeight: "500",
  },
  forgotPasswordText: {
    color: "#787676",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
