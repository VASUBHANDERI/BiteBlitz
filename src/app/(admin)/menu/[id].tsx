import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Button from "../../../components/Button";
import { PizzaSize } from "../../../types";
import products from "../../../../assets/data/products";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "@/providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useProduct } from "@/api/products";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const { addItem } = useCart();
  const router = useRouter();

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => {
            return (
              <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            );
          },
        }}
      />
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
