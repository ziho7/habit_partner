import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import i18n from '@/lib/i18n';


export default function TabLayout() {
  return (
    
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }} >
        <Tabs.Screen
          name="index"
          options={{
            title: i18n.t('home'),
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="data"
          options={{
            title: 'Data',
            headerShown: false,
            href: null,
            tabBarIcon: ({ color }) => <AntDesign name="barschart" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: i18n.t('settings'),
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
      </Tabs>
    
  );
}
