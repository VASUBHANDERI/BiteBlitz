import { ActivityIndicator, FlatList, Text } from "react-native";

import OrderListItem from "@components/OrderListItem";
import { useAdminOrderList, useInsertOrder } from "@/api/orders";
import { View } from "@/components/Themed";
import {
  useDeleteOrderSubscription,
  useInsertOrderSubscription,
  useUpdateOrderSubscription,
} from "@/api/orders/subscription";

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();
  useDeleteOrderSubscription();


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
