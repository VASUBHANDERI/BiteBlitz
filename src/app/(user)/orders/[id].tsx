import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import OrderItemListItem from "../../../components/OrderItemListItem";
import OrderListItem from "../../../components/OrderListItem";
import { useOrderDetails } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscription";
import Bill from "@/components/Bill";
import Loader from "@/components/Loader";
import DeliveryCode from "@/components/DeliveryCode";
import { useAuth } from "@/providers/AuthProvider";
import Address from "@/components/Address";
import Delivered from "@/components/Delivered";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);

  useUpdateOrderSubscription(id);

  if (isLoading || !order) {
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
    <View style={styles.container}>
      {order && <Stack.Screen options={{ title: `Order #${order.id}` }} />}

      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => order && <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Bill orderTotal={order.total} />
            <Address address={order.profile?.address || ""} />
            {order.status != "Delivered" ? (
              <DeliveryCode del_code={order.delivery_code} />
            ) : (
              <Delivered />
            )}
          </>
        )}
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
