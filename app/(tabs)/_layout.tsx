import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import i18n from '@/lib/i18n';
import { useTranslation } from 'react-i18next';



export default function TabLayout() {

  const { t } = useTranslation()

  return (

    <Tabs screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: '#A19C9C',
    }} >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          // tabBarActiveTintColor='#CEBEE8'
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
          title: t('settings'),
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>

  );
}
