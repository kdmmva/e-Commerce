import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function AuthIndex() {
  const router = useRouter();

  useEffect(() => {
    console.log("✅ AuthIndex rendered — scheduling redirect to login...");

    const timeout = setTimeout(() => {
      router.replace("/login");
    }, 0);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
    </View>
  );

  
}
