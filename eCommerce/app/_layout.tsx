import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(auth)",
};

const RootLayoutContent = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
    </Stack>
  );
};

const RootLayout = () => {
  return <RootLayoutContent />;
};

export default RootLayout;
