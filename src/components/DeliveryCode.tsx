import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tables } from "@/types";
import Colors from "@/constants/Colors";

type DeliveryCodeProps = {
  del_code: string;
};

const DeliveryCode = ({ del_code }: DeliveryCodeProps) => {
  return (
    <View style={styles.delCodeContainer}>
      <Text style={styles.heading}>Delivery Code</Text>
      <View style={styles.separatorLine} />
      <Text style={styles.del_code}>{del_code}</Text>
    </View>
  );
};

export default DeliveryCode;

const styles = StyleSheet.create({
  delCodeContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    marginTop: 10,
    paddingBottom: 10,
  },
  del_code: {
    fontWeight: "500",
    fontSize: 28,
    marginVertical: 5,
    color: Colors.light.tint,
    flex: 1,
    alignSelf: "center",
    letterSpacing: 10,
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
