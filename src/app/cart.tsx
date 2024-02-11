import { View, Text, Platform, FlatList, Switch } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";
import Bill from "@/components/Bill";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import CheckBox from "react-native-check-box";

export default function CartScreen() {
  const { items, total, checkout } = useCart();
  const [cod, setCod] = useState(true);
  const toggleSwitch = () => setCod((previousState) => !previousState);

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Your cart is empty</Text>
      </View>
    );
  }
  return (
    <View style={{ padding: 10, flex: 1 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
        ListFooterComponent={() => (
          <>
            <Bill orderTotal={total} />
            {/* <View style={styles.paymentModeContainer}>
              <Text style={styles.heading}>Payment Mode</Text>
              <CheckBox
              checkBoxColor={Colors.light.tint}
                style={{ flex: 1, padding: 10 }}
                onClick={() => {
                  setCod(!cod);
                }}
                isChecked={cod}
                leftText={"Cash on Delivery"}
              />
            </View> */}
          </>
        )}
      />

      <Button onPress={checkout} text="Checkout" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.light.background,
    alignItems: "center",
  },
  text: {
    color: "gainsboro",
    fontWeight: "bold",
    fontSize: 20,
  },
  paymentModeContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    padding: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  heading: {
    fontWeight: "500",
    fontSize: 18,
    // marginBottom: 5,
  },
});
