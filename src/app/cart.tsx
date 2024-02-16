import React, { useState } from "react";
import { View, Text, Platform, FlatList, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";
import Bill from "@/components/Bill";
import PaymentMode from "@/components/PaymentMode";
import Address from "@/components/Address";
import { Link } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { useProfile } from "@/api/profiles";
import { getOrder_id } from "@/api/payment/payment";
import RazorpayCheckout from "react-native-razorpay";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export default function CartScreen() {
  const { items, total, checkout, grandTotal } = useCart();
  const { profile } = useAuth();
  const { data } = useProfile(profile?.id || "");
  const [COD, setCOD] = useState(true);

  const haveAddress = () => {
    if (data !== undefined && data.address !== null && data.address !== "") {
      return true;
    } else {
      return false;
    }
  };

  const handlePayment = async (amount: number) => {
    const order_id = await getOrder_id(amount);
    console.log("order_id: ", order_id);
    console.log("Type: ", typeof RazorpayCheckout, "fun", RazorpayCheckout);
    var options = {
      description: "Buying Food",
      image: require("../../assets/images/icon.png"),
      currency: "INR",
      key: "rzp_test_IKwLnkrt4wamMz",
      amount: amount * 100,
      name: "Pay to BiteBlitz",
      order_id: order_id.toString(),
      prefill: {
        email: profile?.email || "abc@gmail.com",
        contact: profile?.mobile || "9999999999",
        name: profile?.full_name || "John Doe",
      },
      theme: { color: Colors.light.tint },
    };

    if (RazorpayCheckout && typeof RazorpayCheckout.open === "function") {
      await RazorpayCheckout.open(options)
        .then((data) => {
          checkout(false); // handle success
        })
        .catch((error) => {
          console.log("Error: ", error); // handle failure
          alert(`Payment Failed !`);
        });
    } else {
      console.error(
        "RazorpayCheckout is not available or not properly initialized."
      );
    }
  };

  const placeOrder = async (COD: boolean) => {
    if (COD) {
      checkout(true);
    } else {
      handlePayment(grandTotal);
    }
  };

  const profileLink =
    data?.group === "ADMIN" ? "/(admin)/profile" : "/(user)/profile";

  return (
    <View style={{ padding: 10, flex: 1}}>
      {items.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.text}>Your cart is empty</Text>
        </View>
      ) : (
        <View style={{flex:1}}>
          <FlatList
            data={items}
            renderItem={({ item }) => <CartListItem cartItem={item} />}
            contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
            ListFooterComponent={() => (
              <>
                <Bill orderTotal={total} />
                <PaymentMode
                  COD={COD}
                  onChangeMode={(COD) => {
                    setCOD(COD);
                  }}
                />
                {haveAddress() ? (
                  <Address address={data?.address || " "} />
                ) : (
                  <Link
                    href={profileLink as `${string}:${string}`}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 5,
                      flex: 1,
                      marginTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    <Text>Add Address</Text>
                  </Link>
                )}
              </>
            )}
          />
          <Button
            onPress={() => {
              placeOrder(COD);
            }}
            text={!COD ? `Pay ₹${grandTotal}` : "Place Order"}
          />
        </View>
      )}

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
