import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { CartItem } from "../types";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../providers/CartProvider";
import RemoteImage from "./RemoteImage";
const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const getFactor = (size: string) => {
    if (size == "M") {
      return 1;
    } else if (size == "L") {
      return 1.5;
    } else if (size == "XL") {
      return 2;
    } else if (size == "S") {
      return 0.8;
    }
    return 1;
  };

  const finalPrice = cartItem.product.price * getFactor(cartItem.size);

  const { updateQuantity } = useCart();
  return (
    <View style={styles.container}>
      <RemoteImage
        path={cartItem.product.image}
        fallback={defaultImage}
        style={{ ...styles.image, resizeMode: "contain" }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>₹{finalPrice.toFixed(2)}</Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />

        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default CartListItem;
