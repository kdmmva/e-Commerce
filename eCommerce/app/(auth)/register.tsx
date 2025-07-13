import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AuthButton from "../../components /Auth/AuthButton";
import AuthHeader from "../../components /Auth/AuthHeader";
import TextField from "../../components /Auth/TextField";
import useAuthStore from "../../store/authStore";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = useAuthStore((state) => state.register);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register(firstName, lastName, nickname, email, password);
      router.replace("/(tabs)"); 
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <AuthHeader isLogin={false} onSwitch={() => router.replace("/login")} />

      <View style={styles.nameRow}>
        <View style={styles.nameField}>
          <TextField
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name"
          />
        </View>
        <View style={styles.nameField}>
          <TextField
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
          />
        </View>
      </View>

      <TextField
        label="Nickname"
        value={nickname}
        onChangeText={setNickname}
        placeholder="Enter nickname"
      />
      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
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

      <AuthButton title="Sign up" onPress={handleRegister} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  nameField: {
    width: '48%',
  },
});