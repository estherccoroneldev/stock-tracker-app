import { DEFAULT_SYMBOLS } from '@/hooks/useStockWebSocket';
import { useStockStore } from '@/store/useStockStore';
import { TrendingDown, TrendingUp } from '@tamagui/lucide-icons';
import React, { memo } from 'react';
import { FlatList } from 'react-native';
import { Card, H4, Text, View, XStack, YStack } from 'tamagui';

// Memoized item component for performance purposes
const StockItem = memo(({ symbol }: { symbol: string }) => {
  const price = useStockStore((state) => state.prices[symbol]);
  const base = useStockStore((state) => state.basePrices[symbol]);

  const change = price && base ? ((price - base) / base) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <View p="$2">
      <Card borderRadius="$4" p="$4">
        <XStack jc="space-between" ai="center">
          <YStack>
            <H4 fontWeight="bold">{symbol}</H4>
          </YStack>

          <YStack ai="flex-end">
            <Text fontSize="$5" fontWeight="600" color="$color">
              ${price?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '---'}
            </Text>
            <XStack ai="center" gap="$1">
              {isPositive ? (
                <TrendingUp size={14} color="green" />
              ) : (
                <TrendingDown size={14} color="red" />
              )}
              <Text color={isPositive ? '$green10' : '$red10'} fontWeight="bold">
                {isPositive ? '+' : ''}
                {change.toFixed(2)}%
              </Text>
            </XStack>
          </YStack>
        </XStack>
      </Card>
    </View>
  );
});

export default function Watchlist() {
  return (
    <YStack f={1} bc="$background">
      <FlatList
        data={DEFAULT_SYMBOLS}
        renderItem={({ item }) => <StockItem symbol={item} />}
        keyExtractor={(item) => item}
        contentContainerStyle={{ padding: 16 }}
      />
    </YStack>
  );
}
