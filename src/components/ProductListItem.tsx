import { StyleSheet, Image, Text, View, Pressable } from "react-native";
import {  Tables } from "../types";

import Colors from "../constants/Colors";
import { Link, useSegments } from "expo-router";

type ProductListItemProps = {
  product: Tables<"products">;
};

export const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

export default function ProductListItem({ product }: ProductListItemProps) {
  const segments = useSegments();
  if (segments[0]) {
    return (
      <Link
        href={`/${segments[0]}/menu/${product.id}` as `${string}:${string}`}
        asChild
      >
        <Pressable style={styles.container}>
          <Image
            source={{ uri: product.image || defaultImage }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </Pressable>
      </Link>
    );
  } else {
    return;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
    flex: 1,
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
