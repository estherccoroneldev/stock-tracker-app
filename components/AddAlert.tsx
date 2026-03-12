import { DEFAULT_SYMBOLS } from '@/hooks/useStockWebSocket';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Adapt, Button, Form, H2, Input, Label, Select, Sheet, YStack } from 'tamagui';
import { useStockStore } from '../store/useStockStore';

export const AddAlert = () => {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState('');
  const setAlert = useStockStore((state) => state.setAlert);

  const handleSave = () => {
    if (symbol && price) {
      setAlert(symbol, parseFloat(price));
      Alert.alert(`Alert set for ${symbol} at $${price}`);
      setSymbol('');
      setPrice('');
    }
  };

  return (
    <YStack f={1} p="$4" gap="$4" jc="center">
      <Form
        onSubmit={handleSave}
        gap="$4"
        border="2px dashed $borderColor"
        p="$4"
        borderRadius="$4">
        <YStack gap="$2">
          <Label>Select Stock</Label>
          <Select value={symbol} onValueChange={setSymbol} disablePreventBodyScroll>
            <Select.Trigger iconAfter={ChevronDown}>
              <Select.Value placeholder="Pick a symbol..." />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content>
              <Select.ScrollUpButton ai="center" jc="center">
                <ChevronUp size={20} />
              </Select.ScrollUpButton>
              <Select.Viewport>
                <Select.Group>
                  {DEFAULT_SYMBOLS.map((item, i) => (
                    <Select.Item index={i} key={item} value={item}>
                      <Select.ItemText size={'$8'}>{item}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton ai="center" jc="center">
                <ChevronDown size={20} />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
        </YStack>

        <YStack gap="$2">
          <Label>Threshold Price ($)</Label>
          <Input
            keyboardType="numeric"
            placeholder="e.g. 180.50"
            value={price}
            onChangeText={setPrice}
          />
        </YStack>

        <Form.Trigger asChild>
          <Button>Create Alert</Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
};
