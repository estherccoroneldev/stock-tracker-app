import Watchlist from '@/components/WatchList';
import { Stack } from 'expo-router';

export default function WatchListScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Stocks' }} />
      <Watchlist />
    </>
  );
}
