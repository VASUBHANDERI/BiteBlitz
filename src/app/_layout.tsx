import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "../components/useColorScheme";
import CartProvider from "@/providers/CartProvider";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import NotificationProvider from "@/providers/NotificationProvider";
import { StripeProvider } from "@stripe/stripe-react-native";
import StripeFunctionsProvider from "@/providers/StripeFunctionsProvider";
import CodeProvider from "@/providers/CodeProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
console.log(process.env.STRIPE_PUBLISHABLE_KEY);
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StripeProvider publishableKey={process.env.STRIPE_PUBLISHABLE_KEY || ""}>
        <StripeFunctionsProvider>
          <AuthProvider>
            <QueryProvider>
              <NotificationProvider>
                <CartProvider>
                  <CodeProvider>
                    <Stack>
                      <Stack.Screen
                        name="(auth)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(user)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(admin)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name="cart"
                        options={{
                          presentation: "modal",
                          animation: "slide_from_bottom",
                          title: "Cart",
                        }}
                      />
                      <Stack.Screen
                        name="payment"
                        options={{
                          // presentation: "modal",
                          animation: "slide_from_bottom",
                          title: "Payment",
                        }}
                      />
                    </Stack>
                  </CodeProvider>
                </CartProvider>
              </NotificationProvider>
            </QueryProvider>
          </AuthProvider>
        </StripeFunctionsProvider>
      </StripeProvider>
    </ThemeProvider>
  );
}
