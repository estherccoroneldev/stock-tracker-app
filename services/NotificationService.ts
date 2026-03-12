import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const setupNotifications = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
    }),
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('stock-alerts', {
      name: 'Stock Price Alerts',
      importance: Notifications.AndroidImportance.MAX,
    });
  }
};

export const sendPriceAlert = async (symbol: string, price: number) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Price Alert: ${symbol}`,
      body: `${symbol} has hit your target price of $${price.toFixed(2)}!`,
      data: {
        symbol,
      },
      sound: true,
    },
    trigger: null,
  });
};
