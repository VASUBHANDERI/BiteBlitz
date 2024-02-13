import { Alert } from "react-native";
import { supabase } from "./supabase";

import { useStripeFunctions } from "@/providers/StripeFunctionsProvider";

export const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount },
  });
  if (data) {
    console.log(data);
    return data;
  }
  console.log(error);
  Alert.alert("Error fetching payment sheet params");
  return {};
};

export const initialisePaymentSheet = async (amount: number) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripeFunctions();
  console.log("Initialising payment sheet, for: ", amount);

  const { paymentIntent, publishableKey, customer, ephemeralKey } =
    await fetchPaymentSheetParams(amount);

  console.log(
    "paymentIntent: ",
    paymentIntent,
    "publishableKey :",
    publishableKey,
  );

  if (!paymentIntent || !publishableKey) {
    console.log(
      "paymentIntent: ",
      paymentIntent,
      "publishableKey :",
      publishableKey,
    );
    return;
  }

  try {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });

    if (error) {
      console.error("Error initializing payment sheet:", error);
      Alert.alert("Error", "Failed to initialize payment sheet");
    } else {
      console.log("Payment sheet initialized successfully");
    }
  } catch (error) {
    console.error("Error initializing payment sheet:", error);
    Alert.alert("Error", "Failed to initialize payment sheet");
  }
};

export const openPaymentSheet = async () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripeFunctions();
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(error.message);
    return false;
  }
  return true;
};
