import { create } from 'zustand';

interface StockState {
  prices: Record<string, number>;
  alerts: Record<string, number>;
  setPrice: (symbol: string, price: number) => void;
  setAlert: (symbol: string, price: number) => void;
  removeAlert: (symbol: string) => void;
  basePrices: Record<string, number>;
}

export const useStockStore = create<StockState>((set) => ({
  prices: {},
  basePrices: {},
  alerts: { AAPL: 260 },
  setPrice: (symbol, price) =>
    set((state) => {
      const isFirstPrice = !state.basePrices[symbol];
      const newBasePrices = isFirstPrice
        ? { ...state.basePrices, [symbol]: price }
        : state.basePrices;

      return {
        prices: { ...state.prices, [symbol]: price },
        basePrices: newBasePrices,
      };
    }),
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
