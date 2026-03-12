# 📈 Finnhub Real-Time Stock Tracker

A high-performance, real-time stock tracking application built with **Expo**, **Tamagui**, and **Zustand**. This project demonstrates industry-standard patterns for handling high-frequency data streams in React Native.

## 🚀 Features

- **Real-Time Data:** Persistent WebSocket connection to Finnhub for live price updates.
- **Watchlist:** Monitor multiple tickers with live marginal percentage change calculations.
- **Price Alerts:** Local push notifications triggered when stocks cross user-defined thresholds.
- **Adaptive UI:** Fully responsive design with Dark/Light mode support via **Tamagui**.
- **Native Navigation:** Fluid screen transitions using **Expo Router**.

---

## 🛠️ Tech Stack

| **Layer**            | **Technology**                                                                 |
| -------------------- | ------------------------------------------------------------------------------ |
| **Framework**        | [Expo](https://expo.dev/) (SDK 50+)                                            |
| **Language**         | [TypeScript](https://www.typescriptlang.org/)                                  |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand)                                   |
| **UI Components**    | [Tamagui](https://tamagui.dev/)                                                |
| **Navigation**       | [Expo Router](https://docs.expo.dev/router/introduction/)                      |
| **Notifications**    | [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) |

---

## 📦 Installation

### 1. Prerequisites

Ensure you have an API key from [Finnhub.io](https://finnhub.io/).

### 2. Clone and Install

`git clone https://github.com/estherccoroneldev/stock-tracker-app.git`

`cd stock-tracker-app`

`pnpm install`

### 3. Environment Variables

Create a `.env` file in the root directory:

`EXPO_PUBLIC_FINNHUB_KEY=your_api_key_here`

### 4. Running the App

Since this project uses Native Notifications, it is best run via Development Builds:

# For iOS

`npx expo run:ios`

# For Android

`npx expo run:android`

---

## 🏗️ Project Structure & Design Patterns

### Atomic State Updates

To avoid unnecessary re-renders during rapid price changes, the app utilizes **Zustand's selective subscription**. Components only re-render when their specific data point changes, ensuring a smooth experience.

### Layered Separation

1. **`/src/hooks`**: Custom hooks for logic (e.g., WebSocket lifecycle).
2. **`/src/store`**: Pure business logic and state storage.
3. **`/src/components`**: Presentational components styled with Tamagui.
4. **`/src/services`**: Notification service.
5. **`/app`**: Routing logic and screen entry points.

---

## 🛡️ Best Practices Implemented

- **SOLID Principles:** High decoupling between the data source and the UI.
- **Performance Optimization:** Use of `FlatList` for heavy lists.
- **Type Safety:** 100% TypeScript coverage for API responses and component props.
- **Memory Management:** Automatic WebSocket cleanup and alerts state persistence.

---

## 📄 License

This project is licensed under the MIT License.
