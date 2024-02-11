import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { OrderItem, PizzaSize, Tables } from "../types";
import { defaultImage } from "./ProductListItem";
import RemoteImage from "./RemoteImage";

type OrderItemListItemProps = {
  item:{products:Tables<'products'>|null} & Tables<'order_items'>;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
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
  if(item.products){
    const finalPrice =
      item.products?.price * getFactor(item.size);
    const finalTotal = finalPrice * item.quantity;
    return (
      <View style={styles.container}>
        <RemoteImage
          path={item.products?.image}
          fallback={defaultImage}
          style={{ ...styles.image, resizeMode: "contain" }}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.products?.name}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.price}>${finalPrice.toFixed(2)}</Text>
            <Text>Size: {item.size}</Text>
          </View>
        </View>
        <View style={styles.quantitySelector}>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Text style={styles.finalTotal}>{finalTotal}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
    // flexDirection: "row",
    // gap: 10,
    alignItems: "center",
    // marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 16,
    alignSelf: "flex-end",
  },
  finalTotal: {
    fontWeight: "500",
    fontSize: 16,
    color: Colors.light.tint,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default OrderItemListItem;
