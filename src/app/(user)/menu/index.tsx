import { ActivityIndicator, FlatList, Text, View } from "react-native";

import ProductListItem from "../../../components/ProductListItem";

import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useProductList } from "@/api/products";
import Loader from "@/components/Loader";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList(); // Fetches the list of products.

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
