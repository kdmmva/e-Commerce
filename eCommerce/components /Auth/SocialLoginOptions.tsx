import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SocialLoginOptions() {
  return (
    <View style={styles.container}>
      <Text style={styles.dividerText}>Or login with</Text>
      <View style={styles.divider} />

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={18} color="#DB4437" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={18} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={18} color="#4267B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: "center",
  },
  dividerText: {
    color: "#787676",
    fontSize: 14,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#A3A1A2",
    opacity: 0.3,
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
