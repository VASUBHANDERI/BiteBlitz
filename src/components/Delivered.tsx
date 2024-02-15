import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tables } from "@/types";
import Colors from "@/constants/Colors";

const Delivered = () => {
  return (
    <View style={styles.addressContainer}>
      <Text style={styles.heading}>Order Delivered Successfully !</Text>
    </View>
  );
};

export default Delivered;

const styles = StyleSheet.create({
  addressContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginTop: 10,
  },

  heading: {
    fontWeight: "500",
    fontSize: 18,

    alignSelf: "center",
    // marginBottom: 5,
  },
});
