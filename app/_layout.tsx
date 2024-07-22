import GlobalProvider from "@/context/GlobalProvider";
import { Stack } from "expo-router";
import NotificationModal from "@/components/NotificationModal";

export default function RootLayout() {
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
