import { Activity, Home } from '@tamagui/lucide-icons';
import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ color }) => <Activity color={color} />,
          headerRight: () => (
            <Link href="/add-alert" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
