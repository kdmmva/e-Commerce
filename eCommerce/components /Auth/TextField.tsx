import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  label: string;
  secureTextEntry?: boolean;
}

export default function TextField({
  label,
  secureTextEntry,
  ...props
}: TextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}
      >
        <TextInput
          {...props}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          style={styles.input}
          placeholderTextColor="#A3A1A2"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={20}
              color={isFocused ? "#292526" : "#A3A1A2"}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#292526",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(168, 166, 167, 0.2)",
  },
  inputWrapperFocused: {
    borderColor: "rgba(41, 37, 38, 0.3)",
    backgroundColor: "rgba(242, 242, 242, 0.9)",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#292526",
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 4,
    marginLeft: 8,
  },
});
