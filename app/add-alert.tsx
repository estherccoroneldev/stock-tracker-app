import { AddAlert } from '@/components/AddAlert';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

export default function SetPriceAlert() {
  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <AddAlert />
    </>
  );
}
