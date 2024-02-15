import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "../../../../assets/data/orders";
import OrderItemListItem from "../../../components/OrderItemListItem";
import OrderListItem from "../../../components/OrderListItem";
import Colors from "@/constants/Colors";
import { OrderStatusList } from "@/types";
import { useOrderDetails, useUpdateOrder } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscription";
import { notifyUserAboutOrderUPdate } from "@/lib/notifications";
import Bill from "@/components/Bill";
import Loader from "@/components/Loader";
import CodeInput from "@/components/CodeInput";
import { useState } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useCode } from "@/providers/CodeProvider";
import Address from "@/components/Address";
import Delivered from "@/components/Delivered";

const styles1 = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

const CELL_COUNT = 4;

const OrderDetailScreen = () => {
  const [value, setValue] = useState("");
  const isOk = (value: string) => {
    return value.length === CELL_COUNT;
  };
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  const { mutate: updateOrder } = useUpdateOrder();

  const updateStatus = async (status: string) => {
    await updateOrder({ id: id, updatedFields: { status } });
    if (order) {
      await notifyUserAboutOrderUPdate({ ...order, status });
    }
  };

  const deliverOrder = async (del_code: string) => {
    if (del_code === order?.delivery_code) {
      updateStatus("Delivered");
      console.log("Delivered");
    } else {
      alert("Invalid Delivery Code");
    }
  };

  const { code, setCode } = useCode();

  useUpdateOrderSubscription(id);

  if (isLoading) {
    return <Loader />;
  }
  if (error || !order) {
    return (
      <View>
        <Text>Failed to fetch</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Bill orderTotal={order.total} />
            {<Address address={order.profile.address ?? ""} />}
            {order.status != "Delivered" ? (
              <View style={styles.statusControlContainer}>
                <Text style={{ fontWeight: "bold" }}>Status</Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  {OrderStatusList.map((status) => (
                    <Pressable
                      key={status}
                      onPress={() => updateStatus(status)}
                      style={{
                        borderColor: Colors.light.tint,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 5,
                        marginVertical: 10,
                        backgroundColor:
                          order.status === status
                            ? Colors.light.tint
                            : "transparent",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            order.status === status
                              ? "white"
                              : Colors.light.tint,
                        }}
                      >
                        {status}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {order.status == "Delivering" ? (
                  <View>
                    <CodeInput />

                    <Pressable
                      onPress={() => {
                        console.log("Code", code);
                        if (isOk(code)) {
                          setCode("");
                          deliverOrder(code);
                        } else {
                          setCode("");
                          alert("Invalid Delivery Code");
                        }
                      }}
                      style={{
                        backgroundColor: Colors.light.tint,
                        padding: 10,
                        borderRadius: 5,
                        marginVertical: 10,
                      }}
                    >
                      <Text style={{ color: "white", alignSelf: "center" }}>
                        Deliver
                      </Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
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
  statusControlContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.light.background,
    marginVertical: 10,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default OrderDetailScreen;
