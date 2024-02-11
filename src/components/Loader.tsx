import {
  View,
  Text,
  ActivityIndicatorComponent,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loader;
