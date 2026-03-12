import { Stack } from 'expo-router';

import { StyleSheet, Text, View } from 'react-native';

import { ScreenContent } from '@/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Welcome to my Stock Tracker App">
          <Text style={styles.description}>
            This is part of a real challenge to apply to a React Native developer opportunity.
          </Text>
          <Text>
            Future Roadmap here: A graph for plotting the value of all stocks watched in US dollar
            value.
          </Text>
        </ScreenContent>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  description: {
    fontSize: 18,
    marginBottom: 8,
  },
});
