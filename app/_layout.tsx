import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerTitle: "Stiker Smash" }} />
        <Stack.Screen
          name="+not-found"
          options={{ headerTitle: "Not Found" }}
        />
      </Stack>
    </SafeAreaView>
  );
}
