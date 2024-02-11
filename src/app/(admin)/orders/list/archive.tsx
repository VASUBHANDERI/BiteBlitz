import { FlatList, Text, View } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@components/OrderListItem";
import { Stack } from "expo-router";
import { useAdminOrderList } from "@/api/orders";
import { ActivityIndicator } from "react-native";
import Loader from "@/components/Loader";

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true });
  if (isLoading) {
    return <Loader />;
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
