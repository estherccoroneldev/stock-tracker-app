import { create } from 'zustand';

interface StockState {
  prices: Record<string, number>;
  alerts: Record<string, number>;
  setPrice: (symbol: string, price: number) => void;
  setAlert: (symbol: string, price: number) => void;
  removeAlert: (symbol: string) => void;
}

export const useStockStore = create<StockState>((set) => ({
  prices: {},
  alerts: { AAPL: 260 },
  setPrice: (symbol, price) =>
    set((state) => ({
      prices: { ...state.prices, [symbol]: price },
    })),
  setAlert: (symbol, price) =>
    set((state) => ({
      alerts: { ...state.alerts, [symbol]: price },
    })),

  removeAlert: (symbol) =>
    set((state) => {
      const updatedAlerts = { ...state.alerts };
      delete updatedAlerts[symbol];
      return { alerts: updatedAlerts };
    }),
}));
