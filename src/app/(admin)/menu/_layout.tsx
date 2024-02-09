import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerRight: () => {
            return (
              <>
                <Pressable onPress={() => supabase.auth.signOut()}>
                  {({ pressed }) => (
                    <FontAwesome
                      name="sign-out"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
                <Link
                  href={{
                    pathname: `/(admin)/menu/create`,
                    params: {
                      id: "",
                      name: "",
                      price: "",
                      image: "",
                    },
                  }}
                  asChild
                >
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="plus-square-o"
                        size={25}
                        color={Colors.light.tint}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              </>
            );
          },
        }}
      />
    </Stack>
  );
}
