import { ActivityIndicator, FlatList, Text } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@components/OrderListItem";
import { Stack } from "expo-router";
import { useAdminOrderList } from "@/api/orders";
import { View } from "@/components/Themed";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({archived: false});
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
