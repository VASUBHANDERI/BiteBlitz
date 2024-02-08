import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import Button from "../../../components/Button";
import { PizzaSize } from "../../../types";
import products from "../../../../assets/data/products";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "@/providers/CartProvider";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const product = products.find((p) => p.id.toString() === id);
  const { addItem } = useCart();
  const router = useRouter();

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };
  if (!product) return <Text>Product not found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product?.image || defaultImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{product?.name}</Text>
      <Text style={styles.price}>Price: ${product?.price.toFixed(2)}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    // marginTop: "auto",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    // marginTop: "auto",
  },
});

export default ProductDetailsScreen;
