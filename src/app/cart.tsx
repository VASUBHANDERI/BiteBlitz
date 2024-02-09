import { View, Text, Platform, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";
export default function CartScreen() {
  const { items, total,checkout } = useCart();

  return (
    <View style={{ padding: 10,flex:1 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
      />

      <Text style={{ marginTop: "auto", fontSize: 20, fontWeight: "600" }}>
        Total Amount: ${total.toFixed(2)}
      </Text>
      <Button onPress={checkout} text="Checkout" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
