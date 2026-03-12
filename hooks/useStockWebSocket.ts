import { useEffect, useRef } from 'react';
import { sendPriceAlert } from '../services/NotificationService';
import { useStockStore } from '../store/useStockStore';

const FINNHUB_KEY = process.env.EXPO_PUBLIC_FINNHUB_KEY;
const WS_URL = `wss://ws.finnhub.io?token=${FINNHUB_KEY}`;
export const DEFAULT_SYMBOLS = ['AAPL', 'TSLA', 'MSFT', 'NVDA', 'AMZN', 'GOOGL', 'BINANCE:BTCUSDT'];

export const useStockWebSocket = (symbols: string[] = DEFAULT_SYMBOLS) => {
  const { setPrice, removeAlert, alerts } = useStockStore();
  const socket = useRef<WebSocket | null>(null);
  const alertsRef = useRef(alerts);

  useEffect(() => {
    alertsRef.current = alerts;
  }, [alerts]);

  useEffect(() => {
    socket.current = new WebSocket(WS_URL);

    socket.current.onopen = () => {
      symbols.forEach((symbol) => {
        socket.current?.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    };

    socket.current.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.type === 'trade') {
        const { s: symbol, p: price } = response.data[0];

        setPrice(symbol, price);

        const currentAlertPrice = alertsRef.current[symbol];

        // Local Notification when the price goes higher than the price alert.
        if (currentAlertPrice && price >= currentAlertPrice) {
          sendPriceAlert(symbol, price);

          // Clear alert after triggering to avoid spam
          removeAlert(symbol);
          console.info(`Alert triggered for ${symbol}. Alert removed from store.`);
        }
      }
    };

    return () => socket.current?.close();
  }, [symbols]);
};
