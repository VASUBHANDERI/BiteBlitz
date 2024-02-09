import { ActivityIndicator, FlatList, Text, View } from "react-native";
import orders from "../../../../assets/data/orders";
import OrderListItem from "../../../components/OrderListItem";
import { Stack } from "expo-router";
import { useMyOrderList } from "@/api/orders";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();
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
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
