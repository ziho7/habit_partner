import GlobalProvider from "@/context/GlobalProvider";
import { NotifierWrapper } from 'react-native-notifier';
import { Stack } from "expo-router";
import NotificationModal from "@/components/NotificationModal";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="detail/dataPanel" options={{ headerShown: false }} />
      </Stack>

      <NotificationModal />
    </GlobalProvider>


  );
}
