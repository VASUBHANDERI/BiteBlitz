import { View, Text, Platform, FlatList, Switch, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";
import Bill from "@/components/Bill";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import CheckBox from "react-native-check-box";
import { useRouter } from "expo-router";
import { fetchPaymentSheetParams } from "@/lib/stripe";
import {
  PlatformPay,
  PlatformPayButton,
  usePlatformPay,
  useStripe,
} from "@stripe/stripe-react-native";
import RazorpayCheckout from "react-native-razorpay";
import { getOrder_id } from "@/api/payment/payment";

export default function CartScreen() {
  const { items, total, checkout, grandTotal } = useCart();
  const [cod, setCod] = useState(true);
  const toggleSwitch = () => setCod((previousState) => !previousState);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Your cart is empty</Text>
      </View>
    );
  }

  const handlePayment = async (amount: number) => {
    const order_id = await getOrder_id(amount);
    console.log("order_id: ", order_id);

    var options = {
      description: "Buy BMW CAR",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: "INR",
      key: "rzp_test_IKwLnkrt4wamMz",
      amount: amount * 100,
      name: "test order",
      order_id: order_id.toString(), //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
      prefill: {
        email: "xyz@gmail.com",
        contact: "9999999999",
        name: "User 1",
      },
      theme: { color: "#F37254" },
    };

    if (RazorpayCheckout && typeof RazorpayCheckout.open === "function") {
      console.log(RazorpayCheckout.open);
      setTimeout(() => {
        RazorpayCheckout.open(options)
          .then((data) => {
            // handle success
            console.log(`Success: ${data.razorpay_payment_id}`);
          })
          .catch((error) => {
            // handle failure
            console.log(`Error: ${error} | ${error.description}`);
          });
      }, 1000); // delay of 1 second
    } else {
      console.error(
        "RazorpayCheckout is not available or not properly initialized."
      );
    }
  };

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
        ListFooterComponent={() => (
          <>
            <Bill orderTotal={total} />
          </>
        )}
      />

      <Button
        onPress={() => {
          handlePayment(grandTotal);
        }}
        text={`Pay ${grandTotal}`}
      />

      {/* <PlatformPayButton
        type={PlatformPay.ButtonType.Pay}
        onPress={() => {
          onCheckout(grandTotal);
        }}
        style={{
          width: "90%",
          height: 50,
        }}
      /> */}
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
