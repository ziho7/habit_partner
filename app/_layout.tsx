import GlobalProvider from "@/context/GlobalProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="detail/[habitId]" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
}
