import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tables } from "@/types";
import Colors from "@/constants/Colors";

type BillProps = {
  orderTotal: number;
};

const Bill = ({ orderTotal }: BillProps) => {
  const GST = orderTotal * 0.05;
  const Delivery = orderTotal > 1500 ? 0.0 : orderTotal * 0.1;
  const GrandTotal = orderTotal + GST + Delivery;
  return (
    <View style={styles.billContainer}>
      <Text style={styles.heading}>Invoice</Text>
      <View style={styles.separatorLine} />
      <View style={styles.rowContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Subtotal</Text>
        </View>
        <View style={styles.quantitySelector}>
          <Text style={styles.finalTotal}>₹{orderTotal.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>GST (5%)</Text>
        </View>
        <View style={styles.quantitySelector}>
          <Text style={styles.finalTotal}>₹{GST.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={{ flex: 3 }}>
          <Text style={styles.title}>Delivery</Text>
        </View>
        <View>
          <Text style={styles.finalTotal}>₹{Delivery.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.lastRowContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.Totaltitle}>Grand Total</Text>
        </View>
        <View style={styles.quantitySelector}>
          <Text style={styles.grandTotal}>₹{GrandTotal.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

export default Bill;

const styles = StyleSheet.create({
  billContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
   
    // flexDirection: "row",
    // alignItems: "center",
  },
  rowContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 1,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  lastRowContainer: {
    backgroundColor: "white",
    marginTop: 3,
    padding: 1,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "gainsboro",
    borderTopWidth: 1,
  },
  title: {
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 5,
  },
  Totaltitle: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  quantitySelector: {
    alignItems: "center",
  },

  finalTotal: {
    fontWeight: "500",
    fontSize: 16,
    color: Colors.light.tint,
  },
  grandTotal: {
    fontWeight: "600",
    fontSize: 16,
    color: Colors.light.tint,
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
});
