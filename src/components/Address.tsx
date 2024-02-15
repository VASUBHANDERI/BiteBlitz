import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tables } from "@/types";
import Colors from "@/constants/Colors";

type AddressProps = {
  address: string;
};

const Address = ({ address }: AddressProps) => {
  return (
    <View style={styles.addressContainer}>
      <Text style={styles.heading}>Address</Text>
      <View style={styles.separatorLine} />
      <Text style={styles.address}>{address}</Text>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  addressContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    marginTop: 10,
    paddingBottom: 10,
  },
  address: {
    // fontWeight: "500",
    fontSize: 14,
    marginVertical: 5,
    // color: Colors.light.tint,
    flex: 1,
    // alignSelf: "center",
    // letterSpacing: 10,
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
