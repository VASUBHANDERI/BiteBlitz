import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import OrderItemListItem from "../../../components/OrderItemListItem";
import OrderListItem from "../../../components/OrderListItem";
import { useOrderDetails } from "@/api/orders";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const{data:order,isLoading,error} = useOrderDetails(id);



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
    <View style={styles.container}>
      {order && <Stack.Screen options={{ title: `Order #${order.id}` }} />}

      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
