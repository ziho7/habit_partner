import GlobalProvider from "@/context/GlobalProvider";
import { Stack } from "expo-router";
import NotificationModal from "@/components/NotificationModal";

import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";

export default function RootLayout() {

  SplashScreen.preventAutoHideAsync()

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])

  setTimeout(() => {
    onLayoutRootView()
  }, 1500)

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="detail/dataPanel" options={{ headerShown: false }} />
        <Stack.Screen name="pages/contactUs" options={{ headerShown: false }} />
        
      </Stack>

      <NotificationModal />
    </GlobalProvider>


  );
}
