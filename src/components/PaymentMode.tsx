import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Tables } from "@/types";
import Colors from "@/constants/Colors";

type PaymentModeProps = {
  onChangeMode: (value: boolean) => void;
  COD: boolean;
};

const PaymentMode = ({ onChangeMode, COD }: PaymentModeProps) => {
  const [CashOnDelivery, setCOD] = useState(COD);
  return (
    <View style={styles.payModeContainer}>
      <Text style={styles.heading}>Payment Mode</Text>
      <View style={styles.separatorLine} />
      <Pressable
        onPress={() => {
          setCOD(true);
          onChangeMode(true);
        }}
        style={!CashOnDelivery ? styles.payMode : styles.selectedPayMode}
      >
        <Text style={CashOnDelivery ? styles.selectedText : styles.text}>
          Cash On Delivery
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setCOD(false);
          onChangeMode(false);
        }}
        style={CashOnDelivery ? styles.payMode : styles.selectedPayMode}
      >
        <Text style={!CashOnDelivery ? styles.selectedText : styles.text}>
          Pay Online
        </Text>
      </Pressable>
    </View>
  );
};

export default PaymentMode;

const styles = StyleSheet.create({
  payModeContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    marginTop: 10,
    paddingBottom: 10,
  },

  heading: {
    fontWeight: "500",
    fontSize: 18,
    // marginBottom: 5,
  },
  separatorLine: {
    borderBottomColor: "gainsboro",
    borderBottomWidth: 1,
    marginVertical: 5,
  },

  payMode: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginTop: 10,
    paddingVertical: 10,

    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  selectedPayMode: {
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginTop: 10,
    paddingVertical: 10,
  },
  text: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },
  selectedText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
